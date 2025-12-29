import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../../src/app";
import type { Application } from "express";

describe("POST auth/register", () => {
  describe("when input is invalid", () => {
    it("should return status code 201", async () => {
      const res = await request(app as Application)
        .post("/auth/register")
        .send();

      expect(res.statusCode).toBe(201);
    });
  });
});
