// server/src/config/database.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { logger } from "../utils/logger";
import { ENV } from "./env";

/**
 * Make sure DATABASE_URL is set in your .env
 * Optionally set PRISMA_ACCELERATE_URL if your generated client requires it.
 */
const connectionString = ENV.DATABASE_URL ?? "";
if (!connectionString) {
  logger.error("DATABASE_URL is not defined. Set it in your .env file.");
  // don't exit here — allow tests to run if you prefer, or uncomment next line to force exit:
  process.exit(1);
}

/** Create the adapter */
const adapter = new PrismaPg({ connectionString });

/**
 * Build options for PrismaClient.
 * Some generated clients add required fields (e.g. accelerateUrl). If your generated types
 * require that property, you can provide it from an env var PRISMA_ACCELERATE_URL.
 *
 * We construct `options` as `any` to avoid strict type mismatch errors coming from
 * the generated client types. If you control the generated client types you can
 * instead set the correct `PrismaClientOptions` type and include accelerateUrl.
 */
const options: any = {
  adapter,
  log: ["query", "info", "warn", "error"],
};

/** Exported Prisma instance */
export const prisma = new PrismaClient(options);

/** Utility to check DB connection at startup */
export async function checkDatabaseConnection(): Promise<void> {
  try {
    await prisma.$connect();
    logger.info("Database connected successfully");
  } catch (error) {
    logger.error("Database connection failed", error);
    // Exit if you want the process to stop when DB is unreachable
    process.exit(1);
  }
}
