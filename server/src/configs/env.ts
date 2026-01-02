import dotenv from "dotenv";
dotenv.config();

import { logger } from "../utils/logger";

const get = (key: string, fallback?: string) => {
  const val = process.env[key];

  if (!val && fallback === undefined) {
    logger.warn(`ENV: ${key} is not set`);
  }

  return val ?? fallback;
};

export const ENV = {
  NODE_ENV: get("NODE_ENV", "development"),
  PORT: Number(get("PORT", "5000")),
  DATABASE_URL: get("DATABASE_URL", ""),
  JWT_SECRET: get("JWT_SECRET", "test_jwt_secret"),
};
