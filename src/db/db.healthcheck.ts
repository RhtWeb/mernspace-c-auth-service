import { sql } from "drizzle-orm";
import { db } from "./index.js";

export async function dbHealthCheck() {
  await db.execute(sql`SELECT 1`);
}
