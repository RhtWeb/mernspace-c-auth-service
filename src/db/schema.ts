// src/db/schema.ts
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { Role } from "../constants/index.js";

export const roleEnum = pgEnum("user_role", [
  Role.CUSTOMER,
  Role.MANAGER,
  Role.ADMIN,
]);

export const users = pgTable(
  "users",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),

    firstName: varchar("first_name", { length: 100 }).notNull(),

    lastName: varchar("last_name", { length: 100 }).notNull(),

    email: varchar("email", { length: 255 }).notNull().unique(),

    passwordHash: text("password_hash").notNull(),

    role: roleEnum("role").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("users_email_idx").on(table.email)],
);

export const refreshTokens = pgTable("refresh_tokens", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),

  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),

  replacedById: uuid("replaced_by_id"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
