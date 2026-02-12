import type { Request, Response } from 'express';
import { tokenConfig } from '../../config/constants.js';
import { loginSchema, registerSchema } from './auth.schema.js';
import { getCurrentUser, login, logout, refresh, refreshCookieOptions, register } from './auth.service.js';

export async function registerHandler(req: Request, res: Response) {
  const payload = registerSchema.parse(req.body);
  const result = await register(payload.email, payload.password, payload.fullName);

  res.cookie(tokenConfig.refreshCookieName, result.refreshToken, refreshCookieOptions());
  res.status(201).json({ success: true, data: { accessToken: result.accessToken, expiresIn: result.expiresIn, user: result.user } });
}

export async function loginHandler(req: Request, res: Response) {
  const payload = loginSchema.parse(req.body);
  const result = await login(payload.email, payload.password);

  res.cookie(tokenConfig.refreshCookieName, result.refreshToken, refreshCookieOptions());
  res.status(200).json({ success: true, data: { accessToken: result.accessToken, expiresIn: result.expiresIn, user: result.user } });
}

export async function refreshHandler(req: Request, res: Response) {
  const refreshToken = req.cookies[tokenConfig.refreshCookieName];
  if (!refreshToken) {
    res.status(401).json({ success: false, error: 'Missing refresh cookie.' });
    return;
  }

  const result = await refresh(refreshToken);
  res.cookie(tokenConfig.refreshCookieName, result.refreshToken, refreshCookieOptions());
  res.status(200).json({ success: true, data: { accessToken: result.accessToken, expiresIn: result.expiresIn, user: result.user } });
}

export async function logoutHandler(req: Request, res: Response) {
  const refreshToken = req.cookies[tokenConfig.refreshCookieName];
  if (refreshToken) {
    await logout(refreshToken);
  }

  res.clearCookie(tokenConfig.refreshCookieName, refreshCookieOptions());
  res.status(200).json({ success: true, data: { message: 'Logged out successfully.' } });
}

export async function meHandler(req: Request, res: Response) {
  if (!req.auth?.userId) {
    res.status(401).json({ success: false, error: 'Unauthorized.' });
    return;
  }

  const user = await getCurrentUser(req.auth.userId);
  res.status(200).json({ success: true, data: user });
}
