import type { UseFormHandleSubmit } from "react-hook-form";
import type { AuthStage, RegisterForm } from "../../@types/auth";
import { useRegister } from "./queries";
import { setAvailableEmailConfirmation } from "../../utils/emailConfirmationStorage";

interface UseRegisterStageProps {
    email: string
    handleSubmit: UseFormHandleSubmit<RegisterForm>
    setStage: React.Dispatch<React.SetStateAction<AuthStage>>
}

export default function useRegisterStage(props: UseRegisterStageProps) {
    const { register, isPending } = useRegister();

    async function handleRegister(data: RegisterForm) {
        try {
            await register({
                email: props.email,
                fullName: data.fullName,
                password: data.password
            });
            setAvailableEmailConfirmation(props.email);
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