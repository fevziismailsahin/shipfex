use chrono::{DateTime, Utc};
use rdkafka::{
    producer::{FutureProducer, FutureRecord},
    ClientConfig,
};
use serde_json::Value;
use sqlx::{postgres::PgPoolOptions, PgPool};
use std::time::Duration;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};
use uuid::Uuid;

const POLL_INTERVAL_MS: u64 = 500;
const BATCH_SIZE: i64 = 50;

#[derive(sqlx::FromRow)]
struct OutboxRow {
    id: Uuid,
    tenant_id: Uuid,
    dedup_key: String,
    topic: String,
    payload: Value,
    created_at: DateTime<Utc>,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let _ = dotenvy::dotenv();

    tracing_subscriber::registry()
        .with(EnvFilter::try_from_default_env().unwrap_or_else(|_| "info".into()))
        .with(tracing_subscriber::fmt::layer())
        .init();

    let database_url =
        std::env::var("DATABASE_URL").expect("DATABASE_URL environment variable must be set");

    let kafka_brokers = std::env::var("KAFKA_BROKERS")
        .unwrap_or_else(|_| "localhost:9092".to_string());

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await?;

    let producer: FutureProducer = ClientConfig::new()
        .set("bootstrap.servers", &kafka_brokers)
        .set("message.timeout.ms", "5000")
        .create()?;

    tracing::info!(
        "shipfex-outbox-publisher started, polling every {}ms",
        POLL_INTERVAL_MS
    );

    loop {
        match poll_and_publish(&pool, &producer).await {
            Ok(count) => {
                if count > 0 {
                    tracing::info!("Published {} outbox events", count);
                }
            }
            Err(e) => {
                tracing::error!("Error during outbox poll: {}", e);
            }
        }
        tokio::time::sleep(Duration::from_millis(POLL_INTERVAL_MS)).await;
    }
}

async fn poll_and_publish(pool: &PgPool, producer: &FutureProducer) -> anyhow::Result<usize> {
    let mut tx = pool.begin().await?;

    // Fetch a batch of unpublished events, locking rows to prevent concurrent processing
    let rows: Vec<OutboxRow> = sqlx::query_as(
        r#"
        SELECT id, tenant_id, dedup_key, topic, payload, created_at
        FROM integration.outbox_event
        WHERE published_at IS NULL
        ORDER BY created_at ASC
        LIMIT $1
        FOR UPDATE SKIP LOCKED
        "#,
    )
    .bind(BATCH_SIZE)
    .fetch_all(&mut *tx)
    .await?;

    if rows.is_empty() {
        tx.commit().await?;
        return Ok(0);
    }

    let mut published_ids: Vec<Uuid> = Vec::with_capacity(rows.len());

    for row in &rows {
        let payload_bytes = serde_json::to_vec(&row.payload)?;
        let key = format!("{}:{}", row.tenant_id, row.dedup_key);

        let record = FutureRecord::to(&row.topic)
            .payload(&payload_bytes)
            .key(&key);

        match producer.send(record, Duration::from_secs(5)).await {
            Ok(_) => {
                published_ids.push(row.id);
                tracing::debug!(
                    id = %row.id,
                    topic = %row.topic,
                    "Published outbox event"
                );
            }
            Err((e, _)) => {
                tracing::error!(id = %row.id, error = %e, "Failed to publish outbox event");
                // Do not mark as published — will retry next poll
            }
        }
    }

    // Mark successfully published events
    if !published_ids.is_empty() {
        sqlx::query(
            r#"
            UPDATE integration.outbox_event
            SET published_at = now()
            WHERE id = ANY($1)
            "#,
        )
        .bind(&published_ids)
        .execute(&mut *tx)
        .await?;
    }

    tx.commit().await?;
    Ok(published_ids.len())
}
