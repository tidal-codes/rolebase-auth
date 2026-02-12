import { Router } from 'express';
import { asyncHandler } from '../../middleware/async-handler.js';
import { requireAuth } from '../../middleware/auth.js';
import { checkEmailHandler, loginHandler, logoutHandler, meHandler, refreshHandler, registerHandler } from './auth.controller.js';

export const authRouter = Router();

authRouter.post('/register', asyncHandler(registerHandler));
authRouter.post('/check-email', asyncHandler(checkEmailHandler));
authRouter.post('/login', asyncHandler(loginHandler));
authRouter.post('/refresh', asyncHandler(refreshHandler));
authRouter.post('/logout', asyncHandler(logoutHandler));
authRouter.get('/me', requireAuth, asyncHandler(meHandler));
