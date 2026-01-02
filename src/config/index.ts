import { config } from "dotenv";
config();

const { PORT, NODE_ENV } = process.env;

function required(name: string): string {
  const value = process.env[name];
  if (value == undefined || value === "") {
    throw new Error(`${name} is missing`);
  }
  return value;
}

export const Config = {
  PORT: Number(PORT ?? 3000),
  NODE_ENV: NODE_ENV ?? "development",
  DATABASE_URL: required("DATABASE_URL"),
} as const;

// import path from "node:path";

// config({ path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`) });

// const { PORT, NODE_ENV, DATABASE_URL } = process.env;

// if (DATABASE_URL === undefined || DATABASE_URL === "") {
//   throw new Error("DATABASE_URL is not defined or empty");
// }

// // export const Config = {
// //   PORT,
// //   NODE_ENV,
// //   DATABASE_URL,
// // };
