import "dotenv/config";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "./dbConnect.js";

const directory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../db/migrations");
const client = await pool.connect();
await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
  filename TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
)`);
const files = (await readdir(directory)).filter((file) => file.endsWith(".sql")).sort();
for (const file of files) {
  const applied = await client.query("SELECT 1 FROM schema_migrations WHERE filename = $1", [file]);
  if (!applied.rowCount) {
    await client.query("BEGIN");
    try {
      await client.query(await readFile(path.join(directory, file), "utf8"));
      await client.query("INSERT INTO schema_migrations (filename) VALUES ($1)", [file]);
      await client.query("COMMIT");
      console.log(`Applied ${file}`);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    }
  }
}
client.release();
await pool.end();