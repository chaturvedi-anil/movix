import app from "./app";
import { logger } from "./utils/logger";
import { checkDatabaseConnection } from "./configs/database";
import { ENV } from "./configs/env";

const startServer = async () => {
  await checkDatabaseConnection();
  app.listen(ENV.PORT, () => {
    logger.info(`Express server is running on port ${ENV.PORT}`);
  });
};

startServer().catch((err) => {
  logger.error("Server failed to start", err);
  process.exit(1);
});
