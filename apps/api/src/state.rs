use sqlx::PgPool;

/// Shared application state injected into all routes.
#[derive(Clone)]
pub struct AppState {
    pub pool: PgPool,
}
