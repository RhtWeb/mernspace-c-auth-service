import { afterAll, afterEach, beforeAll } from "vitest";
import { db } from "../../../src/db/index.js";
import { refreshTokens, users } from "../../../src/db/schema.js";

beforeAll(() => {});

afterEach(async () => {
  // 1. Delete child records first
  await db.delete(refreshTokens);

  // 2. Now it's safe to delete the parent records
  await db.delete(users);
});

afterAll(async () => {
  await db.$client.end();
});
