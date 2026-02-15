import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api/auth";
import type { RegisterForm } from "../../@types/auth";

export function useCheckForEmailAccount() {
    const mutation = useMutation({
        mutationFn: (email: string) => authApi.checkEmail({ email }),
    });

    return {
        check: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error,
    };

}

export function useLogin() {
    const mutation = useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => authApi.login({ email, password })
    })

    return {
        login: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error
    }
}

export function useRegister() {
    const mutation = useMutation({
        mutationFn: ({ email, fullName, password }: { email: string } & RegisterForm) => authApi.register({ email, fullName, password })
    })
    return {
        register: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error
    }
}

export function useVerifyCode() {
    const mutation = useMutation({
        mutationFn: ({ email, code }: { email: string, code: string }) => authApi.verifyEmail({ email, token: code })
    })
    return {
        verify: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error
    }
}

export function useLogout() {
    const mutation = useMutation({
        mutationFn: () => authApi.logout()
    })
    return {
        logout: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error
    }
}
