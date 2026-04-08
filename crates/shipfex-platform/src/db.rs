use sqlx::{PgPool, Postgres, Transaction};
use std::future::Future;
use std::pin::Pin;
use uuid::Uuid;

use crate::errors::AppError;

/// A boxed, `Send` future with a lifetime `'a`.
pub type BoxFuture<'a, T> = Pin<Box<dyn Future<Output = T> + Send + 'a>>;

/// Execute a closure inside a Postgres transaction with the tenant context set.
/// All domain writes MUST go through this helper to enforce RLS.
///
/// The closure receives a `&mut Transaction` and must return a `BoxFuture`.
/// The transaction is committed after the closure returns `Ok`.
/// On `Err`, the transaction is rolled back (by drop).
pub async fn with_tenant_tx<F, T>(
    pool: &PgPool,
    tenant_id: Uuid,
    f: F,
) -> Result<T, AppError>
where
    F: for<'tx> FnOnce(&'tx mut Transaction<'static, Postgres>) -> BoxFuture<'tx, Result<T, AppError>>
        + Send,
    T: Send,
{
    let mut tx = pool.begin().await.map_err(AppError::Database)?;

    sqlx::query("SELECT set_config('app.tenant_id', $1, true)")
        .bind(tenant_id.to_string())
        .execute(&mut *tx)
        .await
        .map_err(AppError::Database)?;

    let result = f(&mut tx).await?;
    tx.commit().await.map_err(AppError::Database)?;
    Ok(result)
}
