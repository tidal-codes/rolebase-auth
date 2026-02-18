import type { UseFormHandleSubmit } from "react-hook-form";
import type { VerifyCodeForm } from "../../@types/auth";
import { useVerifyCode } from "./queries";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { toast } from "../../utils/toaster";
import { removeAvailableEmailConfirmation } from "../../utils/emailConfirmationStorage";

interface useVerifyCodeStageProps {
    email: string
    handleSubmit: UseFormHandleSubmit<VerifyCodeForm>
}

export default function useVerifyCodeStage({ email, handleSubmit }: useVerifyCodeStageProps) {
    const { verify, isPending } = useVerifyCode();
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    async function handleVerifyCode(data: VerifyCodeForm) {
        try {
            const response = await verify({ email, code: data.pin.join("") })
            setAuth({
                user: response.data.data.user,
                accessToken: response.data.data.accessToken
            })
            navigate("/")
            toast.info(`successfully logged in`);
            removeAvailableEmailConfirmation();
        } catch (error) {
            toast.error(`${error}`)
        }
    }

    const submit = handleSubmit(handleVerifyCode)

    return {
        submit,
        isPending
    }
}