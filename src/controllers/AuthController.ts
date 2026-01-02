import type { Response } from "express";
import type { AuthService } from "../services/AuthService.js";
import type { RegisterRequest } from "../types/index.js";

export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: RegisterRequest, res: Response) => {
    // res.status(201).send("dfd");
    const { firstName, lastName, email, passwordHash } = req.body;
    const user = await this.authService.createUser({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    // res.status(201).json({ id: user.id })
    res.status(201).json(user);
  };
}
