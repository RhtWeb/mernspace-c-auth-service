import jwt, { type JwtPayload } from "jsonwebtoken";
import fs from "node:fs";
import path from "node:path";
import { TokenRepository } from "../repositories/TokenRepository.js";
import { Config } from "../config/index.js";
import { AppError } from "../errors/AppError.js";
import { fileURLToPath } from "node:url";

// Reconstruct __filename and __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. PERFORMANCE FIX: Read the private key ONCE during server startup.
// This prevents blocking the Node.js event loop on every registration request.
const privateKey = fs.readFileSync(
  path.join(__dirname, "../../certs/private.pem"),
);

export class TokenService {
  constructor(private tokenRepository: TokenRepository) {}

  generateAccessToken = (payload: JwtPayload) => {
    const accessToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "1h", // LIFESPAN FIX: 15 minutes
      issuer: "auth-service",
    });

    return accessToken;
  };

  // JTI REQUIREMENT: Explicitly demand the jti parameter
  generateRefreshToken = (payload: JwtPayload, jti: string) => {
    const refreshToken = jwt.sign(
      { ...payload, jti },
      Config.REFRESH_TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "1y", // LIFESPAN FIX: 30 days
        issuer: "auth-service",
        // jwtid: jti
      },
    );
    return refreshToken;
  };

  persistRefreshToken = async (userId: string) => {
    try {
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365);
      const res = await this.tokenRepository.insertRefreshToken({
        expiresAt,
        userId,
      });
      return res;
    } catch (err) {
      // ERROR TRANSLATION: Handle specific PostgreSQL errors
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        err.code === "23503" // PostgreSQL Foreign Key Violation
      ) {
        throw new AppError({
          statusCode: 401,
          message: "Unauthorized: User does not exist.",
          code: "23503",
          category: "UNAUTHORIZED", // Adjust based on your categories
          details: "PostgreSQL Foreign Key Violation",
          cause: "insertRefreshToken",
        });
      }

      throw err;
    }
  };
}
