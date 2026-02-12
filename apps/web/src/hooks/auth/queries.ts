import { useMutation } from "@tanstack/react-query";
import { checkForEmailAccount, loginUser, register, VerifyCode } from "../../api/auth";
import type { RegisterForm, VerifyCodeForm } from "../../@types/auth";

export function useCheckForEmailAccount() {
    const mutation = useMutation({
        mutationFn: (email: string) => checkForEmailAccount(email),
    });

    return {
        check: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error,
    };

}

export function useLogin() {
    const mutation = useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => loginUser(email, password)
    })

    return {
        login: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error
    }
}

export function useRegister() {
    const mutation = useMutation({
        mutationFn: ({ email, fullName, password }: { email: string } & RegisterForm) => register(email, fullName, password)
    })
    return {
        register: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error
    }
}

export function useVerifyCode() {
    const mutation = useMutation({
        mutationFn: ({ email, code }: { email: string, code: string }) => VerifyCode(email, code)
    })
    return {
        verify: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error
    }
}