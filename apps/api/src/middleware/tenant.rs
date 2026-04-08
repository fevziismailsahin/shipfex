use axum::{
    extract::{Request, State},
    http::{HeaderMap, StatusCode},
    middleware::Next,
    response::Response,
};
use std::sync::Arc;
use uuid::Uuid;

use crate::state::AppState;

/// Tenant context extracted from headers.
#[derive(Clone, Debug)]
pub struct TenantContext {
    pub tenant_id: Uuid,
}

/// Axum middleware that reads `X-Tenant-Id` and injects `TenantContext` into request extensions.
pub async fn tenant_middleware(
    State(_state): State<Arc<AppState>>,
    headers: HeaderMap,
    mut req: Request,
    next: Next,
) -> Result<Response, (StatusCode, String)> {
    let tenant_header = headers
        .get("X-Tenant-Id")
        .and_then(|v| v.to_str().ok())
        .ok_or_else(|| {
            (
                StatusCode::BAD_REQUEST,
                "Missing required header: X-Tenant-Id".to_string(),
            )
        })?;

    let tenant_id = Uuid::parse_str(tenant_header).map_err(|_| {
        (
            StatusCode::BAD_REQUEST,
            "Invalid UUID in X-Tenant-Id header".to_string(),
        )
    })?;

    req.extensions_mut().insert(TenantContext { tenant_id });
    Ok(next.run(req).await)
}
