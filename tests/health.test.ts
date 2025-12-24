import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Health Check", () => {
  it("should return 200 and status ok", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ status: "ok" });
  });
});
