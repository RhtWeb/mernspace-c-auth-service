import express, { type Router } from "express";
import { authController } from "../container.js";

const router: Router = express.Router();

router.post("/register", authController.register);

export { router as authRoute };
