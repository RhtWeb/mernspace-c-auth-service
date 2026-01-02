import { afterAll, afterEach, beforeAll } from "vitest";
import { db } from "../../../src/db/index.js";
import { users } from "../../../src/db/schema.js";

beforeAll(() => {});

afterEach(async () => {
  await db.delete(users);
});

afterAll(async () => {
  await db.$client.end();
});
