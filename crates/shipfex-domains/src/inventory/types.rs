use serde::{Deserialize, Serialize};
use serde_json::Value;
use uuid::Uuid;

/// Request payload for inbound PUT endpoint.
#[derive(Debug, Deserialize)]
pub struct InboundPutRequest {
    pub location_alias: String,
    pub asset_upc: String,
    pub quantity: f64,
    pub lot_profile: Option<Value>,
    pub hardware_metadata: Option<Value>,
}

/// Response for inbound PUT endpoint.
#[derive(Debug, Serialize)]
pub struct InboundPutResponse {
    pub success: bool,
    pub lot_id: Uuid,
    pub event_id: Uuid,
    /// true if newly created, false if idempotent replay
    pub created: bool,
}
