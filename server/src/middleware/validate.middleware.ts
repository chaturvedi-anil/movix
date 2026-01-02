import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import AppError from "../utils/appError";

export const validateRequest =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (result.success) {
      req.body = result.data;
      return next();
    }

    const errorMessage = result.error.issues.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    const stringMessage = JSON.stringify(errorMessage);

    return next(new AppError(400, "Invalid request payload", stringMessage));
  };
