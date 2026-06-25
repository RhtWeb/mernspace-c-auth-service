import type { NextFunction, Request, Response } from "express";
import type { AuthService } from "../services/AuthService.js";
import { RegisterDtoSchema } from "../dto/register.dto.js";
import type { TokenService } from "../services/TokenService.js";
import type { JwtPayload } from "jsonwebtoken";

export class AuthController {
  // 1. DEPENDENCY INJECTION: Inject both the service and the repository for easier testing.
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    // 2. THE GLOBAL TRY-CATCH: Wrap the entire synchronous and asynchronous flow.
    try {
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

      const accessToken = this.tokenService.generateAccessToken(payload);

      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60, // 1hr
        httpOnly: true,
        domain: "localhost",
        sameSite: true,
        // secure: true
      });

      const jwtid = await this.tokenService.persistRefreshToken(
        String(user?.id),
      );

      const refreshToken = this.tokenService.generateRefreshToken(
        payload,
        String(jwtid?.id),
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
    } catch (err) {
      // 3. CENTRALIZED ERROR HANDLING: Pass all errors to the global Express error handler.
      // Zod errors, DB errors, and Custom AppErrors will all flow through here.
      next(err);
    }
  };
}

// You already have the Data Guardian (Repository) and the Business Brain (Service).

// Here is the mental model you should hold for the Controller Layer: The Traffic Cop / The Front Desk 🚦
// 1. primary responsibilities:
//     Unpacking & Validating (intercepts http req, parse, validates, dto)
//     Delegating (to service layer)
//     Packaging the Response (ststus code, cookies, json )
//     The Safety Net (global err handler) (next(err))

// 2. Separation of Concerns Boundary
//     It OWNS Express
//     It knows about HTTP
//     It does NOT know Business Rules
//     It does NOT write SQL
