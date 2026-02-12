import type { UseFormHandleSubmit } from "react-hook-form";
import type { AuthStage, RegisterForm } from "../../@types/auth";
import { useRegister } from "./queries";

interface UseRegisterStageProps {
    email: string
    handleSubmit: UseFormHandleSubmit<RegisterForm>
    setStage: React.Dispatch<React.SetStateAction<AuthStage>>
}

export default function useRegisterStage(props: UseRegisterStageProps) {
    const { register, isPending, error } = useRegister();

    async function handleRegister(data: RegisterForm) {
        try {
            const status = await register({
                email: props.email,
                fullName: data.fullName,
                password: data.password
            });
            props.setStage("VERIFY-EMAIL")
        } catch (error) {

        }
    }

    const submit = props.handleSubmit(handleRegister);

    return {
        submit,
        isPending
    }

}