import { Router } from 'express';
import { asyncHandler } from '../../middleware/async-handler.js';
import { requireAuth } from '../../middleware/auth.js';
import {
  checkEmailHandler,
  loginHandler,
  logoutHandler,
  meHandler,
  refreshHandler,
  registerHandler,
  resendEmailConfirmationHandler,
  sessionRemainingHandler,
  verifyEmailConfirmationHandler
} from './auth.controller.js';

export const authRouter = Router();

authRouter.post('/register', asyncHandler(registerHandler));
authRouter.post('/check-email', asyncHandler(checkEmailHandler));
authRouter.post('/resend-confirmation', asyncHandler(resendEmailConfirmationHandler));
authRouter.post('/verify-email', asyncHandler(verifyEmailConfirmationHandler));
authRouter.post('/login', asyncHandler(loginHandler));
authRouter.post('/refresh', asyncHandler(refreshHandler));
authRouter.post('/logout', asyncHandler(logoutHandler));
authRouter.get('/me', requireAuth, asyncHandler(meHandler));
authRouter.get('/session-remaining', requireAuth, asyncHandler(sessionRemainingHandler));
