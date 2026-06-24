import "./setup.js";
import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../../src/app.js";
import { db } from "../../../src/db/index.js";
import { users } from "../../../src/db/schema.js";
import { Role } from "../../../src/constants/index.js";
import { isJWT } from "../utils/index.js";

describe("POST auth/register", () => {
  describe("when input is invalid", () => {
    it("should return status code 201", async () => {
      const userData = {
        firstName: "Rohit",
        lastName: "Singh",
        email: "rhtweb@gmail.com",
        password: "sdfsdrgsf",
        role: Role.CUSTOMER,
      };

      const res = await request(app).post("/auth/register").send(userData);

      expect(res.statusCode).toBe(201);
    });

    it("should return a json object", async () => {
      const userData = {
        firstName: "Rohit",
        lastName: "Singh",
        email: "rhtweb@gmail.com",
        password: "sdfsdrgsf",
        role: Role.CUSTOMER,
      };

      const res = await request(app).post("/auth/register").send(userData);

      expect(res.body).not.toBeNull();
      expect(res.body).toBeTypeOf("object");
      expect(res.type).toBe("application/json");
    });

    it("should persist user in the db", async () => {
      const userData = {
        firstName: "Rohit",
        lastName: "Singh",
        email: "rhtweb@gmail.com",
        password: "sdfsdrgsf",
        role: Role.CUSTOMER,
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
        password: "sdfsdrgsf",
        role: Role.CUSTOMER,
      };

      const res = await request(app).post("/auth/register").send(userData);

      expect(res.body).toHaveProperty("id");
    });

    it("should have role as customer only", async () => {
      const userData = {
        firstName: "Rohit",
        lastName: "Singh",
        email: "rhtweb@gmail.com",
        password: "sdfsdrgsf",
        role: Role.CUSTOMER,
      };

      const res = await request(app).post("/auth/register").send(userData);

      expect(res.body).toHaveProperty("role");
      expect(res.body).toMatchObject({ role: Role.CUSTOMER });
    });

    it.todo("should return the access token and refresh token in cookie");
    it("should return the access token and refresh token in cookie", async () => {
      const userData = {
        firstName: "Rohit",
        lastName: "Singh",
        email: "rhtweb@gmail.com",
        password: "sdfsdrgsf",
        role: Role.CUSTOMER,
      };

      const res = await request(app).post("/auth/register").send(userData);

      let accessToken = null;
      let refreshToken = null;

      const cookies = res.get("Set-Cookie");

      cookies?.map((cookie) => {
        if (cookie.startsWith("accessToken=")) {
          accessToken = cookie.split(";")[0];
        }

        if (cookie.startsWith("refreshToken=")) {
          refreshToken = cookie.split(";")[0];
        }
      });

      expect(accessToken).not.toBeNull();
      expect(refreshToken).not.toBeNull();

      expect(isJWT(accessToken)).toBeTruthy();
      expect(isJWT(accessToken)).toBeTruthy();
    });
  });
});
