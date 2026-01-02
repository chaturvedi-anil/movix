import jwt from "jsonwebtoken";
import { ENV } from "../configs/env";
import AppError from "./appError";

export type JwtPayload = {
  id: string;
  email: string;
};

export const signToken = (payload: JwtPayload) => {
  if (!ENV.JWT_SECRET) {
    throw new AppError(
      500,
      "JWT_SECRET is not defined in the environment variables"
    );
  }

  try {
    return jwt.sign(payload, ENV.JWT_SECRET, {
      expiresIn: "7d",
    });
  } catch (error) {
    throw new AppError(500, "Failed to sign JWT token");
  }
};

export const verifyToken = (token: string) => {
  if (!ENV.JWT_SECRET) {
    throw new AppError(
      500,
      "JWT_SECRET is not defined in the environment variables"
    );
  }

  try {
    return jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;
  } catch (error) {
    throw new AppError(401, "Invalid or expired token");
  }
};
