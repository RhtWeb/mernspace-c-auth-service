import type { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError.js";
import logger from "../config/logger.js";
import { ZodError } from "zod";
import { Config } from "../config/index.js";

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // 1. INTERCEPT ZOD ERRORS 🛡️
  // If the Controller's validation fails, format it cleanly for the client.
  if (err instanceof ZodError) {
    // THE FIX: Map the raw issues into a clean, predictable array for the frontend
    const formattedErrors = err.issues.map((issue) => ({
      field: issue.path.join("."), // e.g., "user.address.street"
      message: issue.message, // e.g., "String must contain at least 1 character(s)"
    }));

    const validationError = new AppError({
      statusCode: 400,
      message: "Validation Error",
      category: "VALIDATION",
      details: formattedErrors, // <-- Attach the newly formatted array here
    });

    logger.warn(
      `[${validationError.id}] Validation failed on ${req.method} ${req.path}`,
    );

    // Must return here to prevent executing the rest of the function
    return res.status(validationError.statusCode).json({
      error: {
        id: validationError.id,
        message: validationError.message,
        category: validationError.category,
        details: validationError.details,
      },
    });
  }

  // 2. STANDARDIZE APP ERRORS 🧠
  // Pass through existing AppErrors, or wrap unknown errors in a 500 fallback.
  const error =
    err instanceof AppError
      ? err
      : new AppError({
          message: "Internal Server Error",
          statusCode: 500,
          category: "INTERNAL",
          cause: err, // Preserve the original crash reason internally
          // retryable: false,
          // code: "INTERNAL_ERROR",
        });

  // 3. SMART LOGGING 📋
  // Only sound the alarm for 500-level crashes. Warn for 400-level client mistakes.
  if (error.statusCode >= 500) {
    logger.error(`[${error.id}] Server Error on ${req.method} ${req.path}`, {
      originalError: error?.cause ?? err,
      // FIX: Explicitly check if cause is undefined
      // originalError: error.cause !== undefined ? error.cause : err,
    });
  } else {
    logger.warn(
      `[${error.id}] Client Error on ${req.method} ${req.path}: ${error.message}`,
    );
  }

  // 4. SECURE RESPONSE PACKAGING 📦
  res.status(error.statusCode).json({
    error: {
      id: error.id,
      message: error.message,
      // Uncommenting category allows frontend clients to write switch statements based on error types
      category: error.category,

      // SECURITY FIX: Only expose the deep cause/stack trace if we are NOT in production
      ...(Config.NODE_ENV !== "production" && { cause: error.cause }),
    },
  });
};
