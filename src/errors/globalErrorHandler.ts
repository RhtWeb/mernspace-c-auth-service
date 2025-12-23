import type { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError.js";
import logger from "../config/logger.js";

export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const error =
    err instanceof AppError
      ? err
      : new AppError({
          code: "INTERNAL_ERROR",
          message: "Unexpected error",
          statusCode: 500,
          category: "INTERNAL",
          retryable: false,
          cause: err,
        });

  logger.error(error.message);

  if (error.category === "INTERNAL") {
    logger.error(error.cause);
  }

  res.status(error.statusCode).json({
    error: {
      id: error.id,
      code: error.code,
      message: error.message,
      category: error.category,
      retryable: error.retryable,
    },
  });
};
