import { Box, Button, Flex, Text } from "@chakra-ui/react";
import FormContainer from "./FormContainer";
import { useCodeVerificationForm } from "../../hooks/auth/forms";
import FieldPinInput from "../ui/fieldPinInput";
import useVerifyCodeStage from "../../hooks/auth/useVerifyCodeStage";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { getAvailableEmailConfirmation, removeAvailableEmailConfirmation } from "../../utils/emailConfirmationStorage";
import { Pen } from "lucide-react";
import List from "../ui/List";
import type { AuthStage } from "../../@types/auth";

interface VerificationCodeFormProps {
    email: string | undefined;
    setStage: Dispatch<SetStateAction<AuthStage>>
}

const VerificationCodeForm = ({ setStage, email }: VerificationCodeFormProps) => {
    const _email = email || getAvailableEmailConfirmation()?.email;
    const { errors, handleSubmit, setFocus, control } = useCodeVerificationForm();
    const { submit, isPending } = useVerifyCodeStage({ email: _email!, handleSubmit });

    useEffect(() => {
        setFocus("pin");
    }, [])

    return (
        <FormContainer>
            <Box mb="2">
                <Text fontSize="xl">
                    Verification Code
                </Text>
                <Flex alignItems="center" gap="3">
                    <Text color="fg.info" fontSize="xl">{_email}</Text>
                    <Button
                        variant="subtle"
                        size="xs"
                        h="auto"
                        p="1"
                        gap="2"
                        color="fg.info"
                        onClick={() => {
                            removeAvailableEmailConfirmation();
                            setStage("LOGIN");
                        }}
                    >
                        change your email
                    </Button>
                </Flex>
                <Box my="4" color="fg.muted">
                    <List>
                        <Text >
                            we have sent a verification code to your email
                        </Text>
                        <Text>
                            if you didn't recive any code please check your spam folder
                        </Text>
                    </List>
                </Box>

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
