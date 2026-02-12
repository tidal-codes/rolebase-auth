import { env } from './env.js';
import { parseDurationToMs } from '../utils/duration.js';

export const tokenConfig = {
  accessTokenTtlMs: parseDurationToMs(env.ACCESS_TOKEN_EXPIRES_IN),
  refreshTokenTtlMs: parseDurationToMs(env.REFRESH_TOKEN_EXPIRES_IN),
  refreshCookieName: env.REFRESH_COOKIE_NAME
};
