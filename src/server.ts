import app from "./app.js";
import { Config } from "./config/index.js";
import logger from "./config/logger.js";

const startServer = () => {
  const PORT = Config.PORT;
  try {
    app.listen(PORT, () => {
      logger.info(`Listening on port ${PORT} on container`);
    });
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

startServer();
