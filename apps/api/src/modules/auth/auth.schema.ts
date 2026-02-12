import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2).max(80)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const checkEmailSchema = z.object({
  email: z.string().email()
});
