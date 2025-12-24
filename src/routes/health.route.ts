import { Router } from "express";
import { healthCheck } from "../controllers/health.controller.js";

const router: Router = Router();

router.get("/", healthCheck);

export { router as healthRouter };
