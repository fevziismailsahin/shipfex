mod middleware;
mod routes;
mod state;

use axum::{
    middleware::from_fn_with_state,
    routing::post,
    Router,
};
use sqlx::postgres::PgPoolOptions;
use std::sync::Arc;
use tower_http::trace::TraceLayer;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};

use middleware::tenant::tenant_middleware;
use routes::inventory::handle_inbound_put;
use state::AppState;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Load .env if present
    let _ = dotenvy::dotenv();

    tracing_subscriber::registry()
        .with(EnvFilter::try_from_default_env().unwrap_or_else(|_| "info".into()))
        .with(tracing_subscriber::fmt::layer())
        .init();

    let database_url = std::env::var("DATABASE_URL")
        .expect("DATABASE_URL environment variable must be set");

    let pool = PgPoolOptions::new()
        .max_connections(10)
        .connect(&database_url)
        .await?;

    // Run migrations
    sqlx::migrate!("../../migrations").run(&pool).await?;

    let state = Arc::new(AppState { pool });

    let app = Router::new()
        .route(
            "/api/v1/inventory/inbound/put",
            post(handle_inbound_put),
        )
        .route_layer(from_fn_with_state(
            Arc::clone(&state),
            tenant_middleware,
        ))
        .with_state(Arc::clone(&state))
        .layer(TraceLayer::new_for_http());

    let addr = "0.0.0.0:8080";
    let listener = tokio::net::TcpListener::bind(addr).await?;
    tracing::info!("shipfex-api listening on {}", addr);
    axum::serve(listener, app).await?;

    Ok(())
}
