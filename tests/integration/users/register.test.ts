import "./setup.js";
import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../../src/app.js";
import { db } from "../../../src/db/index.js";
import { users } from "../../../src/db/schema.js";

describe("POST auth/register", () => {
  describe("when input is invalid", () => {
    it("should return status code 201", async () => {
      const userData = {
        firstName: "Rohit",
        lastName: "Singh",
        email: "rhtweb@gmail.com",
        passwordHash: "sdfsdrgsf",
      };

      const res = await request(app).post("/auth/register").send(userData);

      expect(res.statusCode).toBe(201);
    });

    it("should persist user in the db", async () => {
      const userData = {
        firstName: "Rohit",
        lastName: "Singh",
        email: "rhtweb@gmail.com",
        passwordHash: "sdfsdrgsf",
      };

      await request(app).post("/auth/register").send(userData);

      const userlist = await db.select().from(users);
      expect(userlist).toHaveLength(1);
      expect(userlist[0].firstName).toBe(userData.firstName);
    });

    it("should return id of created user", async () => {
      const userData = {
        firstName: "Rohit",
        lastName: "Singh",
        email: "rhtweb@gmail.com",
        passwordHash: "sdfsdrgsf",
      };

      const res = await request(app).post("/auth/register").send(userData);

      expect(res.body).toHaveProperty("id");
    });
  });
});
