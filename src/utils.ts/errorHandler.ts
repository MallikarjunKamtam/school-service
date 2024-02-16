import { Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../errors/appErrors";

export const globalExceptionHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next
) => {
  console.error("Global Exception Handler :", error);

  if (error instanceof AppError) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
