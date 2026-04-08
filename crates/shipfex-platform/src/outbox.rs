use serde_json::Value;
use sqlx::{Postgres, Transaction};
use uuid::Uuid;

use crate::errors::AppError;

/// Insert an outbox event within an existing transaction.
/// Uses ON CONFLICT DO NOTHING for idempotent dedup by (tenant_id, dedup_key).
pub async fn insert_outbox_event(
    tx: &mut Transaction<'_, Postgres>,
    tenant_id: Uuid,
    dedup_key: &str,
    topic: &str,
    payload: &Value,
) -> Result<(), AppError> {
    sqlx::query(
        r#"
        INSERT INTO integration.outbox_event
            (tenant_id, dedup_key, topic, payload)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (tenant_id, dedup_key) DO NOTHING
        "#,
    )
    .bind(tenant_id)
    .bind(dedup_key)
    .bind(topic)
    .bind(payload)
    .execute(&mut **tx)
    .await
    .map_err(AppError::Database)?;

    Ok(())
}
