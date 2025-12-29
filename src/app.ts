import express, { type Application } from "express";
import { globalErrorHandler } from "./errors/globalErrorHandler.js";
import { healthRouter } from "./routes/health.route.js";
import { authRoute } from "./routes/auth.route.js";

const app: Application = express();

app.use(express.json());

app.use("/auth", authRoute);

app.use("/health", healthRouter);

app.use(globalErrorHandler);

export default app;
