import type { Request, Response } from "express";
import type { AuthService } from "../services/AuthService.js";
import { RegisterDtoSchema } from "../dto/register.dto.js";

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

    res.cookie("accessToken", "ddfdsds", {
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
