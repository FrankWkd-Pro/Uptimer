export interface Env {
  DB: D1Database;
  ADMIN_TOKEN: string;

  // In-memory, per-instance rate limit for admin endpoints.
  // Keep optional so older deployments don't break.
  ADMIN_RATE_LIMIT_MAX?: string;
  ADMIN_RATE_LIMIT_WINDOW_SEC?: string;
}
