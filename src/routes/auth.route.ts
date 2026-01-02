import express, { type Router } from "express";
import { AuthController } from "../controllers/AuthController.js";
import { AuthRepository } from "../repositories/AuthRepository.js";
import { AuthService } from "../services/AuthService.js";

const router: Router = express.Router();
const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

router.post("/register", authController.register);

export { router as authRoute };
