import type { DbClient } from "../db/index.js";
import { refreshTokens } from "../db/schema.js";
import type { persistRefreshTokenDto } from "../dto/token.dto.js";

export class TokenRepository {
  constructor(private db: DbClient) {}

  insertRefreshToken = async ({
    expiresAt,
    userId,
  }: persistRefreshTokenDto) => {
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
