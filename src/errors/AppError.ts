import { randomUUID } from "crypto";
import type { ErrorCategory } from "./categories.js";

export interface AppErrorOptions {
  code: string; // Stable, frontend-consumable
  message: string; // Human-readable
  statusCode: number; // HTTP status
  category: ErrorCategory;
  retryable: boolean;
  details?: unknown; // Optional (never DB internals)
  cause?: unknown; // Original error (never sent)
}

export class AppError extends Error {
  readonly id: string;
  readonly code: string;
  readonly statusCode: number;
  readonly category: ErrorCategory;
  readonly retryable: boolean;
  readonly details?: unknown;
  readonly cause?: unknown;

  constructor(opts: AppErrorOptions) {
    super(opts.message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.id = randomUUID();
    this.code = opts.code;
    this.statusCode = opts.statusCode;
    this.category = opts.category;
    this.retryable = opts.retryable;
    this.details = opts.details;
    this.cause = opts.cause;
  }
}
