import type { Request, Response } from "express";
import type { AuthService } from "../services/AuthService.js";
import { RegisterDtoSchema } from "../dto/register.dto.js";

export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = RegisterDtoSchema.parse(
      req.body,
    );

    const user = await this.authService.createUser({
      firstName,
      lastName,
      email,
      password,
    });

    // res.status(201).json({ id: user.id })
    res.status(201).json(user);
  };
}
