import type { registerDto } from "../dto/register.dto.js";
import { Errors } from "../errors/errorFactory.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  createUser = async ({
    firstName,
    lastName,
    email,
    password,
    role,
  }: registerDto) => {
    try {
      const passwordHash = password;
      const user = await this.userRepository.insertUser({
        firstName,
        lastName,
        email,
        passwordHash,
        role,
      });

      return user;
    } catch (err) {
      // 1. The Strict Type Guard
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        err.code === "23505"
      ) {
        // 2. Handle the specific PostgreSQL unique constraint violation
        throw Errors.Conflict("Email already exists");
      }

      // 3. Re-throw anything else to the global error handler
      throw err;
    }
  };
}

// Here is the exact mental model you should hold for the Service Layer:
// The Business Brain 🧠
//   primary responsibilities:
//     Owning the Business Logic
//     Orchestrating Repositories
//     Translating Errors

// Separation of Concerns
//   It knows about HTTP Status Codes
//   It does NOT know about Express
//   It does NOT write SQL
