import { Box, Button, Text } from "@chakra-ui/react";
import FormContainer from "./FormContainer";
import { useCodeVerificationForm } from "../../hooks/auth/forms";
import FieldPinInput from "../ui/fieldPinInput";
import useVerifyCodeStage from "../../hooks/auth/useVerifyCodeStage";
import { useEffect } from "react";

interface VerificationCodeFormProps {
    email: string
}

const VerificationCodeForm = ({ email }: VerificationCodeFormProps) => {
    const { errors, handleSubmit, setFocus, control } = useCodeVerificationForm();
    const { submit, isPending } = useVerifyCodeStage({ email, handleSubmit });

    useEffect(() => {
        setFocus("pin");
    }, [])

    return (
        <FormContainer>
            <Box mb="2">
                <Text fontSize="xl">
                    Verification Code
                </Text>
                <Text color='fg.muted'>
                    we have sent a verification code to your email
                </Text>
            </Box>
            <FieldPinInput
                length={6}
                control={control}
                errors={errors}
            />
            <Button
                w="full"
                onClick={() => submit()}
                loading={isPending}
                loadingText="verifying"
            >
                verify
            </Button>
        </FormContainer>
    );
}

export default VerificationCodeForm;
