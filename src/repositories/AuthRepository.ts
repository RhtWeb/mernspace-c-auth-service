import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import type { UserData } from "../types/index.js";

export class AuthRepository {
  constructor() {}

  insertUser = async ({
    firstName,
    lastName,
    email,
    passwordHash,
  }: UserData) => {
    const [user] = await db
      .insert(users)
      .values({ firstName, lastName, email, passwordHash })
      .returning({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        createdAt: users.createdAt,
      });

    // const user = result[0];
    return user;
  };
}
