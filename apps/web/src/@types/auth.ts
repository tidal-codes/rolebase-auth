import type z from "zod"
import type { emailSchema, passwordSchema, registerSchema, verifyCodeSchema } from "../hooks/auth/forms"

export type AuthStage = "LOGIN" | "REGISTER" | "VERIFY-EMAIL"
export interface LoginFormData {
    email: string | null;
    password: string | null
}

export type EmailForm = z.infer<typeof emailSchema>;
export type PasswordForm = z.infer<typeof passwordSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type VerifyCodeForm = z.infer<typeof verifyCodeSchema>;