import { useState, type Dispatch, type SetStateAction } from "react";
import type { AuthStage, EmailForm, LoginFormData, PasswordForm } from "../../@types/auth";
import { useCheckForEmailAccount, useLogin } from "./queries";
import { toast } from "../../utils/toaster";
import type { UseFormHandleSubmit } from "react-hook-form";

interface useLoginStageProps {
    setStage: Dispatch<SetStateAction<AuthStage>>,
    showPasswordInput: Boolean,
    setShowPasswordInput: Dispatch<SetStateAction<boolean>>,
    handleEmailSubmit: UseFormHandleSubmit<EmailForm>,
    handlePasswordSubmit: UseFormHandleSubmit<PasswordForm>
}

export default function useLoginStage(props: useLoginStageProps) {
    const { setStage,
        showPasswordInput,
        setShowPasswordInput,
        handleEmailSubmit,
        handlePasswordSubmit } = props;
    const { check, isPending: checkingEmail } = useCheckForEmailAccount();
    const { login, isPending: loggingIn } = useLogin();
    const [email, setEmail] = useState<string | null>(null);

    async function checkForEmail(data: EmailForm) {
        try {
            const checkedEmail = await check(data.email);
            if (checkedEmail.available) {
                setEmail(data.email)
                setShowPasswordInput(true);
            } else {
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