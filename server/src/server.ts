import app from "./app";
import dotenv from "dotenv";
import { logger } from "./utils/logger";
dotenv.config();

const startServer = async () => {
  app.listen(5000, () => {
    logger.info(`Express server is running on port ${5000}`);
  });
};

startServer().catch((err) => {
  logger.error("Server failed to start", err);
  process.exit(1);
});
