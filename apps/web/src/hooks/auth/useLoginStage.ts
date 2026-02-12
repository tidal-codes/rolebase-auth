import { type Dispatch, type SetStateAction } from "react";
import type { AuthStage, EmailForm, PasswordForm } from "../../@types/auth";
import { useCheckForEmailAccount, useLogin } from "./queries";
import { toast } from "../../utils/toaster";
import type { UseFormHandleSubmit } from "react-hook-form";

interface useLoginStageProps {
    setStage: Dispatch<SetStateAction<AuthStage>>,
    email: string,
    setEmail: Dispatch<SetStateAction<string>>
    showPasswordInput: Boolean,
    setShowPasswordInput: Dispatch<SetStateAction<boolean>>,
    handleEmailSubmit: UseFormHandleSubmit<EmailForm>,
    handlePasswordSubmit: UseFormHandleSubmit<PasswordForm>
}

export default function useLoginStage(props: useLoginStageProps) {
    const { setStage,
        email,
        setEmail,
        showPasswordInput,
        setShowPasswordInput,
        handleEmailSubmit,
        handlePasswordSubmit } = props;
    const { check, isPending: checkingEmail } = useCheckForEmailAccount();
    const { login, isPending: loggingIn } = useLogin();

    async function checkForEmail(data: EmailForm) {
        try {
            const checkedEmail = await check(data.email);
            if (checkedEmail.available) {
                setEmail(data.email)
                setShowPasswordInput(true);
            } else {
                setEmail(data.email)
                setStage("REGISTER");
            }

        } catch (error) {
            toast.error(`${error}`)
        }
    }

    async function logInAccount(data: PasswordForm) {
        if (!email) return;
        try {
            const user = await login({ email, password: data.password });
            toast.info(`successfully logged in as ${user.name}`)
        } catch (error) {
            toast.error(`${error}`)
        }
    }

    const submitEmail = handleEmailSubmit(checkForEmail);
    const submitPassword = handlePasswordSubmit(logInAccount)

    function submit() {
        if (!showPasswordInput) {
            submitEmail();
        } else {
            submitPassword();
        }
    }

    return {
        submit,
        checkingEmail,
        loggingIn,

    }
}