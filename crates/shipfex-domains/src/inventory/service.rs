use serde_json::{json, Value};
use sqlx::PgPool;
use uuid::Uuid;

use shipfex_platform::{
    db::{with_tenant_tx, BoxFuture},
    errors::AppError,
    gs1::normalize_gtin14,
    outbox::insert_outbox_event,
};

use super::{
    repo::{
        fetch_event_id_by_idempotency_key, insert_ledger_put, update_lot_projection_add,
        upsert_inventory_lot, upsert_stub_asset, resolve_location_id,
    },
    types::{InboundPutRequest, InboundPutResponse},
};

/// Derive the idempotency key from request headers and body.
pub fn derive_idempotency_key(
    tenant_id: Uuid,
    header_key: Option<&str>,
    req: &InboundPutRequest,
) -> Result<String, AppError> {
    if let Some(key) = header_key {
        if !key.trim().is_empty() {
            return Ok(format!("put:{}:{}", tenant_id, key.trim()));
        }
    }

    // Fallback: require scan_ts_local in hardware_metadata
    let hw = req.hardware_metadata.as_ref().ok_or_else(|| {
        AppError::Validation(
            "Idempotency-Key header missing and hardware_metadata not provided".into(),
        )
    })?;

    let scan_ts = hw
        .get("scan_ts_local")
        .and_then(|v| v.as_str())
        .ok_or_else(|| {
            AppError::Validation(
                "Idempotency-Key header missing and hardware_metadata.scan_ts_local not provided"
                    .into(),
            )
        })?;

    let device_type = hw
        .get("device_type")
        .and_then(|v| v.as_str())
        .unwrap_or("unknown");

    let gtin14 = normalize_gtin14(&req.asset_upc)?;

    Ok(format!(
        "put:{}:{}:{}:{}:{}",
        tenant_id, device_type, req.location_alias, gtin14, scan_ts
    ))
}

/// Execute the inbound PUT business logic.
pub async fn inbound_put(
    pool: &PgPool,
    tenant_id: Uuid,
    idempotency_key_header: Option<&str>,
    req: InboundPutRequest,
) -> Result<InboundPutResponse, AppError> {
    // --- Validation ---
    if req.quantity <= 0.0 {
        return Err(AppError::Validation("quantity must be > 0".into()));
    }
    if req.location_alias.trim().is_empty() {
        return Err(AppError::Validation("location_alias is required".into()));
    }

    let gtin14 = normalize_gtin14(&req.asset_upc)?;
    let idempotency_key = derive_idempotency_key(tenant_id, idempotency_key_header, &req)?;
    let lot_profile: Value = req.lot_profile.clone().unwrap_or_else(|| json!({}));
    let hardware_metadata: Value = req.hardware_metadata.clone().unwrap_or_else(|| json!({}));
    let location_alias = req.location_alias.trim().to_owned();
    let quantity = req.quantity;

    with_tenant_tx(pool, tenant_id, move |tx| -> BoxFuture<'_, Result<InboundPutResponse, AppError>> {
        Box::pin(async move {
            // 1. Resolve location
            let location_id = resolve_location_id(tx, &location_alias).await?;

            // 2. Upsert stub asset
            let asset_id = upsert_stub_asset(tx, tenant_id, &gtin14).await?;

            // 3. Upsert inventory lot
            let lot_id =
                upsert_inventory_lot(tx, tenant_id, location_id, asset_id, &lot_profile).await?;

            // 4. Insert ledger event (idempotent)
            let maybe_event_id = insert_ledger_put(
                tx,
                tenant_id,
                lot_id,
                quantity,
                &idempotency_key,
                &hardware_metadata,
            )
            .await?;

            if let Some(event_id) = maybe_event_id {
                // New event: update projection + insert outbox
                update_lot_projection_add(tx, lot_id, quantity).await?;

                let outbox_payload = json!({
                    "event_id": event_id,
                    "tenant_id": tenant_id,
                    "lot_id": lot_id,
                    "location_id": location_id,
                    "asset_id": asset_id,
                    "gtin14": gtin14,
                    "quantity": quantity,
                    "lot_profile": lot_profile,
                });

                insert_outbox_event(
                    tx,
                    tenant_id,
                    &idempotency_key,
                    "inventory.lot.put.v1",
                    &outbox_payload,
                )
                .await?;

                Ok(InboundPutResponse {
                    success: true,
                    lot_id,
                    event_id,
                    created: true,
                })
            } else {
                // Replay: fetch existing event_id
                let event_id =
                    fetch_event_id_by_idempotency_key(tx, tenant_id, &idempotency_key).await?;

                Ok(InboundPutResponse {
                    success: true,
                    lot_id,
                    event_id,
                    created: false,
                })
            }
        })
    })
    .await
}
