import type { DbClient } from "../db/index.js";
import { refreshTokens } from "../db/schema.js";

type NewRT = {
  expiresAt: Date;
  userId: string;
};

export class RefreshTokenRepository {
  constructor(private db: DbClient) {}

  insertRefreshToken = async ({ expiresAt, userId }: NewRT) => {
    const [refreshToken] = await this.db
      .insert(refreshTokens)
      .values({
        expiresAt,
        userId,
      })
      .returning({
        id: refreshTokens.id,
      });

    return refreshToken;
  };
}
