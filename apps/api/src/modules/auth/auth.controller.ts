import type { Request, Response } from 'express';
import { tokenConfig } from '../../config/constants.js';
import { checkEmailSchema, loginSchema, registerSchema, resendConfirmationSchema, verifyEmailSchema } from './auth.schema.js';
import {
  checkEmailExists,
  getCurrentUser,
  getSessionRemainingSeconds,
  login,
  logout,
  refresh,
  refreshCookieOptions,
  register,
  resendEmailConfirmation,
  verifyEmailConfirmation
} from './auth.service.js';

export async function registerHandler(req: Request, res: Response) {
  const payload = registerSchema.parse(req.body);
  const result = await register(payload.email, payload.password, payload.fullName);

  if ('requiresEmailConfirmation' in result) {
    res.status(201).json({ success: true, data: result });
    return;
  }

  res.cookie(tokenConfig.refreshCookieName, result.refreshToken, refreshCookieOptions());
  res.status(201).json({ success: true, data: { accessToken: result.accessToken, expiresIn: result.expiresIn, user: result.user } });
}

export async function checkEmailHandler(req: Request, res: Response) {
  const payload = checkEmailSchema.parse(req.body);
  const result = await checkEmailExists(payload.email);

  res.status(200).json({ success: true, data: result });
}

export async function resendEmailConfirmationHandler(req: Request, res: Response) {
  const payload = resendConfirmationSchema.parse(req.body);
  const result = await resendEmailConfirmation(payload.email);

  res.status(200).json({ success: true, data: result });
}

export async function verifyEmailConfirmationHandler(req: Request, res: Response) {
  const payload = verifyEmailSchema.parse(req.body);
  const result = await verifyEmailConfirmation(payload.email, payload.token);

  res.status(200).json({ success: true, data: result });
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

export async function sessionRemainingHandler(req: Request, res: Response) {
  if (!req.auth?.userId) {
    res.status(401).json({ success: false, error: 'Unauthorized.' });
    return;
  }

  const refreshToken = req.cookies[tokenConfig.refreshCookieName];
  if (!refreshToken) {
    res.status(401).json({ success: false, error: 'Missing refresh cookie.' });
    return;
  }

  const secondsRemaining = await getSessionRemainingSeconds(refreshToken, req.auth.userId);
  res.status(200).json({ success: true, data: { secondsRemaining } });
}
