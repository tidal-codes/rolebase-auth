import type { RequestHandler } from 'express';
import { verifyAccessToken } from '../modules/auth/jwt.js';

export const requireAuth: RequestHandler = async (req, res, next) => {
  const header = req.header('authorization');
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    res.status(401).json({ success: false, error: 'Missing Bearer token.' });
    return;
  }

  try {
    const { payload } = await verifyAccessToken(token);
    req.auth = {
      userId: payload.sub ?? '',
      email: String(payload.email ?? ''),
      role: String(payload.role ?? 'authenticated')
    };
    next();
  } catch {
    res.status(401).json({ success: false, error: 'Invalid or expired access token.' });
  }
};
