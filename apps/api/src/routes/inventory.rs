use axum::{
    extract::State,
    http::{HeaderMap, StatusCode},
    response::IntoResponse,
    Extension, Json,
};
use std::sync::Arc;

use shipfex_domains::inventory::{service::inbound_put, types::InboundPutRequest};

use crate::{middleware::tenant::TenantContext, state::AppState};

/// Handler for POST /api/v1/inventory/inbound/put
pub async fn handle_inbound_put(
    State(state): State<Arc<AppState>>,
    Extension(tenant): Extension<TenantContext>,
    headers: HeaderMap,
    Json(req): Json<InboundPutRequest>,
) -> impl IntoResponse {
    let key = headers
        .get("idempotency-key")
        .and_then(|v| v.to_str().ok())
        .map(|s| s.to_owned());

    match inbound_put(&state.pool, tenant.tenant_id, key.as_deref(), req).await {
        Ok(resp) => {
            let status = if resp.created {
                StatusCode::CREATED
            } else {
                StatusCode::OK
            };
            (status, Json(resp)).into_response()
        }
        Err(e) => e.into_response(),
    }
}
