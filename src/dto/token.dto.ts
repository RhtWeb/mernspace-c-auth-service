import z from "zod";

export const PersistRefreshToken = z.object({
  expiresAt: z.coerce.date(),
  userId: z.uuid(),
});

export type persistRefreshTokenDto = z.infer<typeof PersistRefreshToken>;
