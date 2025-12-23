import { AppError } from "./AppError.js";

export const Errors = {
  Validation: (details?: unknown) =>
    new AppError({
      code: "VALIDATION_ERROR",
      message: "Invalid request data",
      statusCode: 400,
      category: "VALIDATION",
      retryable: false,
      details,
    }),

  Unauthorized: (message = "Unauthorized") =>
    new AppError({
      code: "AUTH_UNAUTHORIZED",
      message,
      statusCode: 401,
      category: "AUTH",
      retryable: false,
    }),

  Forbidden: () =>
    new AppError({
      code: "AUTH_FORBIDDEN",
      message: "Access denied",
      statusCode: 403,
      category: "FORBIDDEN",
      retryable: false,
    }),

  NotFound: (resource = "Resource") =>
    new AppError({
      code: "RESOURCE_NOT_FOUND",
      message: `${resource} not found`,
      statusCode: 404,
      category: "NOT_FOUND",
      retryable: false,
    }),

  Conflict: (message: string) =>
    new AppError({
      code: "RESOURCE_CONFLICT",
      message,
      statusCode: 409,
      category: "CONFLICT",
      retryable: false,
    }),

  InfraFailure: (cause?: unknown) =>
    new AppError({
      code: "INFRA_FAILURE",
      message: "Temporary service issue",
      statusCode: 503,
      category: "INFRA",
      retryable: true,
      cause,
    }),

  Internal: (cause?: unknown) =>
    new AppError({
      code: "INTERNAL_ERROR",
      message: "Something went wrong",
      statusCode: 500,
      category: "INTERNAL",
      retryable: false,
      cause,
    }),
};
