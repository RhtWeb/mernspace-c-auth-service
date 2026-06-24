import z from "zod";
import { Role } from "../constants/index.js";

export const RegisterDtoSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
  role: z.literal(Role.CUSTOMER),
});

export type registerDto = z.infer<typeof RegisterDtoSchema>;
