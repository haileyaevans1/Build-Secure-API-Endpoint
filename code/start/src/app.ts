import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { logger, morganStream } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import secureRoutes from './routes/secure';

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors());

// morgan -> use winston via stream
app.use(morgan('combined', { stream: morganStream }));

// Rate limiter (can be adjusted by env)
const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000;
const max = Number(process.env.RATE_LIMIT_MAX) || 100;
app.use(
  rateLimit({
    windowMs,
    max,
    handler: (_req, res) =>
      res.status(429).json({ error: 'Too many requests, please try again later.' })
  })
);

// Routes
app.get('/', (_req, res) => res.json({ message: 'Secure API Endpoint - running' }));
app.use('/auth', authRoutes);
app.use('/secure', secureRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// centralized error handling
app.use(errorHandler);

export default app;
