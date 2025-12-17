import winston from "winston";
import { Config } from "./index.js";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  defaultMeta: { serviceName: "setUp-service" },
  transports: [
    new winston.transports.File({
      dirname: "logs",
      filename: "combine.log",
      level: "info",
      silent: Config.NODE_ENV === "test" || Config.NODE_ENV === "production",
    }),
    new winston.transports.File({
      dirname: "logs",
      filename: "error.log",
      level: "error",
      silent: Config.NODE_ENV === "test",
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
      level: "debug",
      //silent: false,
      silent: Config.NODE_ENV !== "development",
    }),
  ],
});

export default logger;
