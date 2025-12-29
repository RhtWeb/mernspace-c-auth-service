import express, { type Router } from "express";
import { AuthController } from "../controllers/AuthController.js";

const router: Router = express.Router();

const authController = new AuthController();

router.post("/register", authController.register);

export { router as authRoute };
