import { config } from "dotenv";

config();

const { PORT, NODE_ENV, DATABASE_URL } = process.env;

if (DATABASE_URL === undefined || DATABASE_URL === "") {
  throw new Error("DATABASE_URL is not defined or empty");
}

// export const Config = {
//   PORT,
//   NODE_ENV,
//   DATABASE_URL,
// };

export const Config = {
  PORT: PORT,
  // PORT: PORT ? Number(PORT) : 3000,
  NODE_ENV: NODE_ENV ?? "development",
  DATABASE_URL,
};
