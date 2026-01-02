import type { registerDto } from "../dto/register.dto.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  createUser = async ({
    firstName,
    lastName,
    email,
    password,
  }: registerDto) => {
    const passwordHash = password;
    const user = await this.userRepository.insertUser({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    return user;
  };
}
