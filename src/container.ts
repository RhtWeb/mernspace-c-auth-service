import { db } from "./db/index.js";

import { AuthController } from "./controllers/AuthController.js";
import { UserRepository } from "./repositories/UserRepository.js";
import { AuthService } from "./services/AuthService.js";
import { TokenRepository } from "./repositories/TokenRepository.js";
import { TokenService } from "./services/TokenService.js";

const authRepository = new UserRepository(db);
const authService = new AuthService(authRepository);

const tokenRepository = new TokenRepository(db);
const tokenService = new TokenService(tokenRepository);

export const authController = new AuthController(authService, tokenService);
