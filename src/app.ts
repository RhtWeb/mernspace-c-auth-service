import express, { type Application } from "express";
import { globalErrorHandler } from "./errors/globalErrorHandler.js";
// import { Errors } from "./errors/errorFactory.js";

const app: Application = express();

app.get("/", (req, res) => {
  // const err = Errors.NotFound("data");
  // throw err;
  res.send("Welcome to express app");
});

app.use(globalErrorHandler);

export default app;
