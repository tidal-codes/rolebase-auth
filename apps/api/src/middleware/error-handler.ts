import type { ErrorRequestHandler } from 'express';

function resolveStatusCode(message: string): number {
  if (/missing bearer token|invalid|expired|unauthorized|mismatch|revoked|refresh cookie/i.test(message)) {
    return 401;
  }

  if (/not found/i.test(message)) {
    return 404;
  }

  return 400;
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const message = err instanceof Error ? err.message : 'Unexpected server error';
  const statusCode = resolveStatusCode(message);

  res.status(statusCode).json({
    success: false,
    error: message
  });
};
