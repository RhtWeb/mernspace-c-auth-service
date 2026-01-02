import { db } from "./db/index.js";

import { AuthController } from "./controllers/AuthController.js";
import { UserRepository } from "./repositories/UserRepository.js";
import { AuthService } from "./services/AuthService.js";

const authRepository = new UserRepository(db);
const authService = new AuthService(authRepository);
export const authController = new AuthController(authService);
