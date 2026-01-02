import type { AuthRepository } from "../repositories/AuthRepository.js";
import type { UserData } from "../types/index.js";

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  createUser = async ({
    firstName,
    lastName,
    email,
    passwordHash,
  }: UserData) => {
    const user = await this.authRepository.insertUser({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    return user;
  };
}
