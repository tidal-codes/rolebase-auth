import type z from "zod"
import type { emailSchema, passwordSchema, registerSchema, verifyCodeSchema } from "../hooks/auth/forms"
import type { RouteObject } from "react-router";

export type AuthStage = "LOGIN" | "REGISTER" | "VERIFY-EMAIL"
export interface LoginFormData {
    email: string | null;
    password: string | null
}

export type EmailForm = z.infer<typeof emailSchema>;
export type PasswordForm = z.infer<typeof passwordSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type VerifyCodeForm = z.infer<typeof verifyCodeSchema>;

export type User = {
    id: string;
    role: string;
    email: string;
};

export type AuthContextType = {
    user: User | null;
    accessToken: string | null;
    loading: boolean,
    setAuth: (data: { user: User; accessToken: string }) => void;
    clearAuth: () => void;
};

export type AppRouteObject = RouteObject & {
    protected?: boolean;
};

export interface AvailableEmailConfirmType {
    email : string,
    expiresAt : number
}

// ------- RESOPNSES ------------

export interface CheckEmailResponse {
    success: boolean,
    data: {
        email: string,
        exists: boolean
    }
}

export interface LoginResponse {
    success: boolean;
    data: {
        accessToken: string;
        expiresIn: number;
        user: User;
    }
}