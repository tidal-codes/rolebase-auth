import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const message = err instanceof Error ? err.message : 'Unexpected server error';
  const statusCode = /invalid|expired|unauthorized|not found|mismatch|revoked/i.test(message) ? 401 : 400;

  res.status(statusCode).json({
    success: false,
    error: message
  });
};
