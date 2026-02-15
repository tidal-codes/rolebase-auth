import type { CheckEmailResponse, LoginResponse, RemainingSessionResponse } from "../@types/auth";
import { api } from "../libs/client";

export const authApi = {
    checkEmail: (body: { email: string }) => {
        return api.post<CheckEmailResponse>("auth/check-email", body)
    },
    login: (body: { email: string, password: string }) => {
        return api.post<LoginResponse>("auth/login", body)
    },
    refresh: () => {
        return api.post<LoginResponse>("auth/refresh");
    },
    logout: () => {
        return api.post("auth/logout");
    },
    register: (body: { email: string, fullName: string, password: string }) => {
        return api.post("auth/register", body)
    },
    verifyEmail: (body: { email: string, token: string }) => {
        return api.post("auth/verify-email", body)
    },
    resendConfirmationCode: (body: { email: string }) => {
        return api.post("auth/resend-confirmation", body)
    },
    remainingSession: () => {
        return api.get<RemainingSessionResponse>("auth/session-remaining")
    }

}

