import type { Request } from "express";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}

export interface RegisterRequest extends Request {
  body: UserData;
}
