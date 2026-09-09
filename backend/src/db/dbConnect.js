import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is required (for example: postgresql://user:password@localhost:5432/roomapp)"
  );
}

const poolMax = Number(process.env.PG_POOL_MAX || 20);

if (!Number.isInteger(poolMax) || poolMax < 1 || poolMax > 100) {
  throw new Error("PG_POOL_MAX must be an integer between 1 and 100");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl:
    process.env.PGSSL === "true"
      ? { rejectUnauthorized: false }
      : false,

  // Maximum PostgreSQL connections per Node.js process.
  max: poolMax,

  // Close idle connections after 30 seconds.
  idleTimeoutMillis: 30_000,

  // Don't wait forever for a PostgreSQL connection.
  connectionTimeoutMillis: 5_000,

  // Keep TCP connections alive.
  keepAlive: true,
  keepAliveInitialDelayMillis: 10_000,

  // PostgreSQL will cancel queries that run longer than this.
  statement_timeout: Number(
    process.env.PG_STATEMENT_TIMEOUT_MS || 10_000
  ),

  // Timeout while waiting for a lock.
  lock_timeout: Number(
    process.env.PG_LOCK_TIMEOUT_MS || 5_000
  ),
});

// Prevent unexpected pool errors from crashing silently.
pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error);
});

export const query = (text, params) => pool.query(text, params);

export const checkDatabaseHealth = async () => {
  const start = performance.now();

  await query("SELECT 1");

  return {
    healthy: true,
    latencyMs: Number((performance.now() - start).toFixed(2)),
  };
};


const dbConnect = async () => {
  await query("SELECT 1");
  console.log("PostgreSQL connected");
};


export default dbConnect;