use serde_json::Value;
use sqlx::{Postgres, Transaction};
use uuid::Uuid;

use shipfex_platform::errors::AppError;

/// Resolve a location ID from its barcode alias (tenant-scoped via RLS).
pub async fn resolve_location_id(
    tx: &mut Transaction<'_, Postgres>,
    barcode_alias: &str,
) -> Result<Uuid, AppError> {
    let row = sqlx::query_as::<_, (Uuid,)>(
        "SELECT id FROM twin.location WHERE barcode_alias = $1",
    )
    .bind(barcode_alias)
    .fetch_optional(&mut **tx)
    .await
    .map_err(AppError::Database)?;

    row.map(|(id,)| id)
        .ok_or_else(|| AppError::Unprocessable(format!("Unknown location alias: {}", barcode_alias)))
}

/// Upsert a stub asset master record for an auto-created UPC asset.
/// Returns the asset_id.
pub async fn upsert_stub_asset(
    tx: &mut Transaction<'_, Postgres>,
    tenant_id: Uuid,
    gtin14: &str,
) -> Result<Uuid, AppError> {
    let sku = format!("AUTO-UPC-{}", gtin14);
    let metadata = serde_json::json!({
        "upc": gtin14,
        "auto_created": true,
        "status": "draft"
    });

    let row = sqlx::query_as::<_, (Uuid,)>(
        r#"
        INSERT INTO catalog.asset_master (tenant_id, sku_or_part_num, metadata)
        VALUES ($1, $2, $3)
        ON CONFLICT (tenant_id, sku_or_part_num)
        DO UPDATE SET updated_at = now()
        RETURNING id
        "#,
    )
    .bind(tenant_id)
    .bind(&sku)
    .bind(&metadata)
    .fetch_one(&mut **tx)
    .await
    .map_err(AppError::Database)?;

    Ok(row.0)
}

/// Upsert an inventory lot by (tenant, location, asset, lot_profile_hash).
/// Returns the lot_id.
pub async fn upsert_inventory_lot(
    tx: &mut Transaction<'_, Postgres>,
    tenant_id: Uuid,
    location_id: Uuid,
    asset_id: Uuid,
    lot_profile: &Value,
) -> Result<Uuid, AppError> {
    let row = sqlx::query_as::<_, (Uuid,)>(
        r#"
        INSERT INTO inventory.inventory_lot
            (tenant_id, location_id, asset_id, lot_profile)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (tenant_id, location_id, asset_id, lot_profile_hash)
        DO UPDATE SET updated_at = now()
        RETURNING id
        "#,
    )
    .bind(tenant_id)
    .bind(location_id)
    .bind(asset_id)
    .bind(lot_profile)
    .fetch_one(&mut **tx)
    .await
    .map_err(AppError::Database)?;

    Ok(row.0)
}

/// Insert a PUT ledger event. Returns Some(event_id) if inserted, None if duplicate.
pub async fn insert_ledger_put(
    tx: &mut Transaction<'_, Postgres>,
    tenant_id: Uuid,
    lot_id: Uuid,
    quantity: f64,
    idempotency_key: &str,
    hardware_metadata: &Value,
) -> Result<Option<Uuid>, AppError> {
    let row = sqlx::query_as::<_, (Uuid,)>(
        r#"
        INSERT INTO inventory.inventory_ledger_event
            (tenant_id, lot_id, action, quantity, idempotency_key, metadata)
        VALUES ($1, $2, 'PUT', $3, $4, $5)
        ON CONFLICT (tenant_id, idempotency_key) DO NOTHING
        RETURNING event_id
        "#,
    )
    .bind(tenant_id)
    .bind(lot_id)
    .bind(quantity)
    .bind(idempotency_key)
    .bind(hardware_metadata)
    .fetch_optional(&mut **tx)
    .await
    .map_err(AppError::Database)?;

    Ok(row.map(|(id,)| id))
}

/// Fetch the existing event_id for a given idempotency key (replay path).
pub async fn fetch_event_id_by_idempotency_key(
    tx: &mut Transaction<'_, Postgres>,
    tenant_id: Uuid,
    idempotency_key: &str,
) -> Result<Uuid, AppError> {
    let row = sqlx::query_as::<_, (Uuid,)>(
        r#"
        SELECT event_id FROM inventory.inventory_ledger_event
        WHERE tenant_id = $1 AND idempotency_key = $2
        "#,
    )
    .bind(tenant_id)
    .bind(idempotency_key)
    .fetch_one(&mut **tx)
    .await
    .map_err(AppError::Database)?;

    Ok(row.0)
}

/// Update the lot projection: quantity_available += quantity.
pub async fn update_lot_projection_add(
    tx: &mut Transaction<'_, Postgres>,
    lot_id: Uuid,
    quantity: f64,
) -> Result<(), AppError> {
    sqlx::query(
        r#"
        UPDATE inventory.inventory_lot
        SET quantity_available = quantity_available + $1,
            updated_at = now()
        WHERE id = $2
        "#,
    )
    .bind(quantity)
    .bind(lot_id)
    .execute(&mut **tx)
    .await
    .map_err(AppError::Database)?;

    Ok(())
}
