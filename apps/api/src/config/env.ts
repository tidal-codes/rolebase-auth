import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  API_PREFIX: z.string().default('/api/v1'),
  APP_URL: z.string().url(),
  CORS_ORIGIN: z.string().min(1),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  ACCESS_TOKEN_SECRET: z.string().min(32),
  REFRESH_TOKEN_SECRET: z.string().min(32),
  ACCESS_TOKEN_EXPIRES_IN: z.string().default('5m'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('20m'),
  REFRESH_COOKIE_NAME: z.string().default('aa_refresh'),
  COOKIE_DOMAIN: z.string().optional()
});

export const env = envSchema.parse(process.env);
