use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use uuid::Uuid;

/// A generic event envelope wrapping domain events for outbox publishing.
#[derive(Debug, Serialize, Deserialize)]
pub struct EventEnvelope {
    pub event_id: Uuid,
    pub tenant_id: Uuid,
    pub topic: String,
    pub payload: Value,
    pub occurred_at: DateTime<Utc>,
}

impl EventEnvelope {
    pub fn new(event_id: Uuid, tenant_id: Uuid, topic: impl Into<String>, payload: Value) -> Self {
        Self {
            event_id,
            tenant_id,
            topic: topic.into(),
            payload,
            occurred_at: Utc::now(),
        }
    }
}
