import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { logger } from "../utils/logger";
import { ENV } from "./env";

if (!ENV.DATABASE_URL) {
  logger.error("DATABASE_URL is not defined");
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString: ENV.DATABASE_URL });

export const prismaClient = new PrismaClient({
  adapter,
  log: ["warn", "error"],
});

export async function checkDatabaseConnection() {
  try {
    await prismaClient.$queryRawUnsafe("SELECT 1");
    logger.info("Database connected successfully");
  } catch (error) {
    logger.error("Database connection failed", error);
    process.exit(1);
  }
}
