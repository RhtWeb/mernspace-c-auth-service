import z from "zod";

export const RegisterDtoSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
});

export type registerDto = z.infer<typeof RegisterDtoSchema>;
