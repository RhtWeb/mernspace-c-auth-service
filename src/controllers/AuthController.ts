import type { Request, Response } from "express";
import type { AuthService } from "../services/AuthService.js";
import { RegisterDtoSchema } from "../dto/register.dto.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import fs from "node:fs";
import path from "node:path";
import { AppError } from "../errors/AppError.js";

export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, role } =
      RegisterDtoSchema.parse(req.body);

    const user = await this.authService.createUser({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    const payload: JwtPayload = {
      sub: user?.id,
      role: user?.role,
      // tenent: user.tenent,
    };

    let privateKey: Buffer;

    try {
      privateKey = fs.readFileSync(
        path.join(__dirname, "../../certs/private.pem"),
      );
      // privateKey = await fs.promises.readFile(path.join(__dirname, "../../certs/private.pem"));
      // Fix: Read the certificate once when the server starts and store it in a variable, OR use the asynchronous fs.promises.readFile().
    } catch {
      // console.error(err);
      throw new AppError({ statusCode: 500, message: "cannot read file" });
    }

    const accessToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "1h",
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60, // 1hr
      httpOnly: true,
      domain: "localhost",
      sameSite: true,
      // secure: true
    });

    res.cookie("refreshToken", "ddfdsds", {
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
