import { SignJWT, jwtVerify } from 'jose';
import { env } from '../../config/env.js';
import { tokenConfig } from '../../config/constants.js';

const accessSecret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET);
const refreshSecret = new TextEncoder().encode(env.REFRESH_TOKEN_SECRET);

export type AccessTokenPayload = {
  sub: string;
  email: string;
  role: string;
};

export type RefreshTokenPayload = {
  sub: string;
  sid: string;
};

export async function signAccessToken(payload: AccessTokenPayload): Promise<string> {
  return new SignJWT({ email: payload.email, role: payload.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${Math.floor(tokenConfig.accessTokenTtlMs / 1000)}s`)
    .sign(accessSecret);
}

export async function signRefreshToken(payload: RefreshTokenPayload, expiresAt?: Date): Promise<string> {
  const expiration = expiresAt
    ? Math.floor(expiresAt.getTime() / 1000)
    : `${Math.floor(tokenConfig.refreshTokenTtlMs / 1000)}s`;

  return new SignJWT({ sid: payload.sid })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(expiration)
    .sign(refreshSecret);
}

export async function verifyAccessToken(token: string) {
  return jwtVerify(token, accessSecret);
}

export async function verifyRefreshToken(token: string) {
  return jwtVerify(token, refreshSecret);
}
