import type { NextFunction, Request, Response } from "express";
import type { AuthService } from "../services/AuthService.js";
import { RegisterDtoSchema } from "../dto/register.dto.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import fs from "node:fs";
import path from "node:path";
import { AppError } from "../errors/AppError.js";
import { Config } from "../config/index.js";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository.js";
import { db } from "../db/index.js";

export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, role } =
      RegisterDtoSchema.parse(req.body);

    const user = await this.authService.createUser({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    let privateKey: Buffer;

    try {
      privateKey = fs.readFileSync(
        path.join(__dirname, "../../certs/private.pem"),
      );
      // privateKey = await fs.promises.readFile(path.join(__dirname, "../../certs/private.pem"));
      // Fix: Read the certificate once when the server starts and store it in a variable, OR use the asynchronous fs.promises.readFile().
    } catch {
      // console.error(err);
      const err = new AppError({
        statusCode: 500,
        message: "cannot read file",
      });
      next(err);
      return;
    }

    const payload: JwtPayload = {
      sub: user?.id,
      role: user?.role,
      // tenent: user.tenent,
    };

    const accessToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "1h",
      issuer: "auth-service",
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60, // 1hr
      httpOnly: true,
      domain: "localhost",
      sameSite: true,
      // secure: true
    });

    let jwtid;

    try {
      const refreshTokenInstance = new RefreshTokenRepository(db);
      jwtid = await refreshTokenInstance.insertRefreshToken({
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        userId: String(user?.id),
      });
    } catch {
      const err = new AppError({
        statusCode: 500,
        message: "DB error",
      });
      next(err);
      return;
    }

    const refreshToken = jwt.sign(
      { ...payload, jti: jwtid?.id },
      Config.REFRESH_TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "1h",
        issuer: "auth-service",
      },
    );

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1yr
      httpOnly: true,
      domain: "localhost",
      sameSite: true,
      // secure: true
    });

    // res.status(201).json({ id: user.id })
    res.status(201).json(user);
  };
}
