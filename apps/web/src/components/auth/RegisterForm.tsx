import { Button, Input } from '@chakra-ui/react';
import FormContainer from './FormContainer';
import { useRegisterForm } from '../../hooks/auth/forms';
import FormInput from './FormInput';
import useRegisterStage from '../../hooks/auth/useRegisterStage';
import type { AuthStage } from '../../@types/auth';
import { useEffect } from 'react';

interface RegisterFormProps {
    email: string;
    setStage: React.Dispatch<React.SetStateAction<AuthStage>>
}

const RegisterForm = ({ email, setStage }: RegisterFormProps) => {
    const { errors, handleSubmit, setFocus: RegisterFormFocus, register } = useRegisterForm();
    const { submit, isPending } = useRegisterStage({
        email,
        handleSubmit,
        setStage
    })

    useEffect(() => {
        RegisterFormFocus("fullName");
    }, [])

    return (

        <FormContainer>
            <Input
                value={email}
                disabled={true}
            />
            <FormInput
                register={register}
                errors={errors}
                field="fullName"
                placeholder='enter your full name'

            />
            <FormInput
                register={register}
                errors={errors}
                field="password"
                placeholder='enter your password'
                password={true}

            />

            <Button
                w="full"
                onClick={submit}
                loading={isPending}
                loadingText="sending verification code"
            >
                send verification code
            </Button>
        </FormContainer>

    );
}

export default RegisterForm;
