import { Pool } from "pg";
import { Config } from "../config/index.js";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  connectionString: Config.DATABASE_URL,
  max: 10, // sensible default
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 2_000,
});

export const db = drizzle(pool);
export type DbClient = typeof db;
