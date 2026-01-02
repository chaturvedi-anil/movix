import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import { logger } from "../utils/logger";

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal server error";
  let details;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    details = err.details;
    //   } else if (err instanceof ZodError) {
    //     statusCode = 400;
    //     message = "Validation failed";
    //     details = err.errors;
    //   } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    //     // prisma handling
    //   }

    // logging
    logger.error({ message: err.message, stack: err.stack });

    if (process.env.NODE_ENV === "production" && statusCode === 500) {
      message = "Something went wrong";
      details = undefined;
    }

    res.status(statusCode).json({
      success: false,
      message,
      ...(details && { details }),
    });
  }
};
