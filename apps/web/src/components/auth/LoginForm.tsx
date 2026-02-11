import { AnimatePresence, motion } from "motion/react";
import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import FormContainer from "./FormContainer";
import type { AuthStage } from "../../@types/auth";
import useLoginStage from "../../hooks/auth/useLoginStage";
import { useEmailForm, usePasswordForm } from "../../hooks/auth/forms";
import FormInput from "./FormInput";
import { Pen } from "lucide-react";

interface LoginFormProps {
    setStage: React.Dispatch<React.SetStateAction<AuthStage>>
}

const MotionDiv = motion.create(Box);

const LoginForm = ({ setStage }: LoginFormProps) => {
    const [showPasswordInput, setShowPasswordInput] = useState(false);

    const {
        register: emailRegister,
        errors: emailErros,
        resetField: resetEmail,
        handleSubmit: handleEmailSubmit
    } = useEmailForm();
    const {
        register: passwordRegister,
        errors: passwordErros,
        resetField: resetPassword,
        handleSubmit: handlePasswordSubmit
    } = usePasswordForm();

    const { submit, checkingEmail, loggingIn } = useLoginStage({
        setStage,
        showPasswordInput,
        setShowPasswordInput,
        handleEmailSubmit,
        handlePasswordSubmit,
    });


    return (
        <FormContainer>
            <FormInput
                register={emailRegister}
                errors={emailErros}
                field="email"
                placeholder="enter your email"
                disabled={showPasswordInput}
                onInsideButtonClick={() => {
                    setShowPasswordInput(false);
                    resetEmail("email");
                    resetPassword("password");
                }}
                icon={<Pen />}
            />
            <AnimatePresence mode="popLayout">
                {showPasswordInput && (
                    <MotionDiv
                        key="password-field"
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 , transition : {duration : 0.1} }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                        }}
                    >
                        <FormInput
                            register={passwordRegister}
                            errors={passwordErros}
                            field="password"
                            placeholder="enter your password"
                            disabled={loggingIn}
                            password={true}
                        />
                    </MotionDiv>
                )}
            </AnimatePresence>

            <Button
                w="full"
                onClick={() => submit()}
                loading={loggingIn || checkingEmail}
                loadingText="checking your email"
            >
                submit
            </Button>
        </FormContainer>
    );
};

export default LoginForm;



