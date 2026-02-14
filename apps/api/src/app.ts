import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { errorHandler } from './middleware/error-handler.js';
import { authRouter } from './modules/auth/auth.routes.js';
import { healthRouter } from './modules/health/health.routes.js';
import { postsRouter } from './modules/posts/posts.routes.js';

export const app = express();

const configuredCorsOrigins = env.CORS_ORIGIN.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const isAllowedCorsOrigin = (origin?: string): boolean => {
  if (!origin) {
    return true;
  }

  if (configuredCorsOrigins.includes(origin)) {
    return true;
  }

  if (env.NODE_ENV === 'development') {
    try {
      const parsedOrigin = new URL(origin);
      if (parsedOrigin.hostname === 'localhost' || parsedOrigin.hostname === '127.0.0.1') {
        return true;
      }
    } catch {
      return false;
    }
  }

  return false;
};

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedCorsOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(
  `${env.API_PREFIX}/auth`,
  rateLimit({
    windowMs: 60_000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.use(`${env.API_PREFIX}/health`, healthRouter);
app.use(`${env.API_PREFIX}/auth`, authRouter);
app.use(`${env.API_PREFIX}/posts`, postsRouter);

app.use(errorHandler);
