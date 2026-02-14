import type { UseFormHandleSubmit } from "react-hook-form";
import type { VerifyCodeForm } from "../../@types/auth";
import { useVerifyCode } from "./queries";

interface useVerifyCodeStageProps {
    email: string
    handleSubmit: UseFormHandleSubmit<VerifyCodeForm>
}

export default function useVerifyCodeStage({ email, handleSubmit }: useVerifyCodeStageProps) {
    const { verify, isPending } = useVerifyCode();
    async function handleVerifyCode(data: VerifyCodeForm) {
        try {
            const response = await verify({ email, code: data.pin.join("") })
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    const submit = handleSubmit(handleVerifyCode)

    return {
        submit,
        isPending
    }
}