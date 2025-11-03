// src/server.ts
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import requestLogger from "./middleware/requestLogger";
import logger from "./config/logger";
import authRoutes from "./routes/auth";
import secureRoutes from "./routes/secure";
import errorHandler from "./middleware/errorHandler";

import { addUser } from "./utils/users";

(async () => {
  // seed users - passwords: adminpass, userpass
  await addUser("1", "admin", "adminpass", "ADMIN");
  await addUser("2", "alice", "userpass", "USER");
})();


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// rate limiter
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000,
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
});
app.use(limiter);

// routes
app.use("/auth", authRoutes);
app.use("/secure", secureRoutes);

// centralized errors
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});
