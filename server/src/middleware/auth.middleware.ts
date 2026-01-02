import { NextFunction, Request, Response } from "express";
import { CatchAsyncRequest } from "../utils/catchAsync";
import AppError from "../utils/appError";
import { verifyToken } from "../utils/jwt";

export const isAuthenticated = CatchAsyncRequest(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError(401, "Unauthorized");
    }

    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  }
);
