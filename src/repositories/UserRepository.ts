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
    role,
  }: NewUser) => {
    const [user] = await this.db
      .insert(users)
      .values({ firstName, lastName, email, passwordHash, role })
      .returning({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
      });

    // const user = result[0];
    return user;
  };
}

// Let's review the mental model we established for the Repository layer:
//     The Data Guardian 🛡️: This layer deals strictly with the database.
//     It attempts an operation and either succeeds or throws a raw database error.
//     It should never know about HTTP status codes or Express concepts.

// Option 1: No catch block. If it fails, Drizzle throws the raw error automatically!
// Option 2: If you MUST use a try...catch (e.g., for specific DB metric logging)
