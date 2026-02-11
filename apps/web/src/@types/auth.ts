import type z from "zod"
import type { emailSchema, passwordSchema } from "../hooks/auth/forms"

export type AuthStage = "LOGIN" | "REGISTER" | "CONFIRM-EMAIL"
export interface LoginFormData {
    email: string | null;
    password: string | null
}

export type EmailForm = z.infer<typeof emailSchema>;
export type PasswordForm = z.infer<typeof passwordSchema>;