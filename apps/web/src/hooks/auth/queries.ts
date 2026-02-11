import { useMutation } from "@tanstack/react-query";
import { checkForEmailAccount, loginUser } from "../../api/auth";

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