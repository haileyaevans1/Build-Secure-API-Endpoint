import morgan from "morgan";
import logger from "../config/logger";

const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export default morgan("combined", { stream });
