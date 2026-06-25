import z from "zod";
import { Role } from "../constants/index.js";

// 1. The Incoming Request Validation (What the client sends)
export const RegisterDtoSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
  role: z.literal(Role.CUSTOMER),
});

export type registerDto = z.infer<typeof RegisterDtoSchema>;

// 2. The Outgoing Response Validation (What the client receives)
export const RegisterResponseSchema = z.object({
  id: z.uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  role: z.enum([Role.CUSTOMER, Role.MANAGER, Role.ADMIN]),
  // createdAt: z.date(), // Use z.coerce.date() if parsing directly from JSON strings in tests
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(), // <-- Use this if the field isn't always returned
});

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
