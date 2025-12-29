import type { Request, Response } from "express";
// interface IAuthController {
//   register: () => {}
// }

export class AuthController {
  constructor() {}

  register = (_req: Request, res: Response) => {
    res.status(201).send("dfd");
  };
}
