import type { DbClient } from "../db/index.js";
import { users } from "../db/schema.js";
import type { NewUser } from "../types/index.js";

export class UserRepository {
  constructor(private db: DbClient) {}

  insertUser = async ({
    firstName,
    lastName,
    email,
    passwordHash,
  }: NewUser) => {
    const [user] = await this.db
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
