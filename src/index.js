import app from "./app.js";
import { logger } from "./configs/logger.js";

const PORT = process.env.PORT || 8000;

let server;

server = app.listen(PORT, () => {
  logger.info("Running...");
});

const exitHandler = () => {
  if (server) {
    logger.info("Server closed");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

// the error here is passed as an event
const unhandledExceptionErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

// handling error gracefully
process.on("uncaughtException", unhandledExceptionErrorHandler);
process.on("unhandledRejection", unhandledExceptionErrorHandler);

// signal termination
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed");
    process.exit(1);
  }
});
