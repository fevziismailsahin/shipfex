//! Integration tests for inventory inbound PUT with idempotency.
//!
//! These tests require a running PostgreSQL instance.
//! Set DATABASE_URL environment variable to run:
//!   DATABASE_URL=postgres://shipfex:shipfex@localhost/shipfex cargo test --test inbound_put_idempotency
//!
//! Run with docker-compose:
//!   docker compose up -d
//!   cargo test --test inbound_put_idempotency -- --nocapture

use serde_json::json;
use shipfex_domains::inventory::{service::inbound_put, types::InboundPutRequest};
use sqlx::postgres::PgPoolOptions;
use uuid::Uuid;

async fn setup_pool() -> sqlx::PgPool {
    let database_url = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| "postgres://shipfex:shipfex@localhost/shipfex".to_string());

    PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to connect to database for integration tests")
}

async fn run_migrations(pool: &sqlx::PgPool) {
    sqlx::migrate!("../../migrations")
        .run(pool)
        .await
        .expect("Failed to run migrations");
}

/// Create a tenant and a location in the DB, returning (tenant_id, barcode_alias).
async fn seed_tenant_and_location(pool: &sqlx::PgPool) -> (Uuid, String) {
    let tenant_id: Uuid = sqlx::query_scalar(
        "INSERT INTO governance.tenant (name) VALUES ($1) RETURNING id",
    )
    .bind(format!("test-tenant-{}", Uuid::new_v4()))
    .fetch_one(pool)
    .await
    .expect("Failed to insert test tenant");

    let barcode_alias = format!("LOC-{}", Uuid::new_v4());

    // Set tenant context for the insert
    let mut tx = pool.begin().await.unwrap();
    sqlx::query("SELECT set_config('app.tenant_id', $1, true)")
        .bind(tenant_id.to_string())
        .execute(&mut *tx)
        .await
        .unwrap();

    sqlx::query(
        "INSERT INTO twin.location (tenant_id, barcode_alias) VALUES ($1, $2)",
    )
    .bind(tenant_id)
    .bind(&barcode_alias)
    .execute(&mut *tx)
    .await
    .expect("Failed to insert test location");

    tx.commit().await.unwrap();

    (tenant_id, barcode_alias)
}

#[tokio::test]
async fn test_inbound_put_idempotency() {
    let pool = setup_pool().await;
    run_migrations(&pool).await;

    let (tenant_id, barcode_alias) = seed_tenant_and_location(&pool).await;
    let idempotency_key = format!("test-key-{}", Uuid::new_v4());

    let req_factory = || InboundPutRequest {
        location_alias: barcode_alias.clone(),
        asset_upc: "884116305606".to_string(),
        quantity: 10.0,
        lot_profile: Some(json!({ "condition": "new", "supplier": "vendor_x" })),
        hardware_metadata: Some(json!({
            "device_type": "pwa_camera",
            "scan_ts_local": "2026-04-08T14:20:00Z"
        })),
    };

    // First call
    let resp1 = inbound_put(&pool, tenant_id, Some(&idempotency_key), req_factory())
        .await
        .expect("First inbound_put should succeed");

    assert!(resp1.created, "First call should return created=true");
    let event_id = resp1.event_id;
    let lot_id = resp1.lot_id;

    // Second call with same idempotency key
    let resp2 = inbound_put(&pool, tenant_id, Some(&idempotency_key), req_factory())
        .await
        .expect("Second inbound_put should succeed (replay)");

    assert!(!resp2.created, "Second call should return created=false");
    assert_eq!(
        resp2.event_id, event_id,
        "Both calls should return the same event_id"
    );
    assert_eq!(
        resp2.lot_id, lot_id,
        "Both calls should return the same lot_id"
    );

    // Verify ledger event count is exactly 1
    let mut tx = pool.begin().await.unwrap();
    sqlx::query("SELECT set_config('app.tenant_id', $1, true)")
        .bind(tenant_id.to_string())
        .execute(&mut *tx)
        .await
        .unwrap();

    let ledger_count: i64 = sqlx::query_scalar(
        r#"
        SELECT COUNT(*) FROM inventory.inventory_ledger_event
        WHERE tenant_id = $1 AND idempotency_key = $2
        "#,
    )
    .bind(tenant_id)
    .bind(format!("put:{}:{}", tenant_id, idempotency_key))
    .fetch_one(&mut *tx)
    .await
    .expect("Failed to count ledger events");

    assert_eq!(ledger_count, 1, "Ledger event should be inserted exactly once");

    // Verify lot quantity_available increased only once (by 10.0)
    let quantity: f64 = sqlx::query_scalar(
        "SELECT quantity_available::float8 FROM inventory.inventory_lot WHERE id = $1",
    )
    .bind(lot_id)
    .fetch_one(&mut *tx)
    .await
    .expect("Failed to fetch lot");

    tx.commit().await.unwrap();

    assert!(
        (quantity - 10.0).abs() < f64::EPSILON,
        "quantity_available should be 10.0, got {}",
        quantity
    );

    println!(
        "✅ Idempotency test passed: event_id={}, lot_id={}, qty={}",
        event_id, lot_id, quantity
    );
}
