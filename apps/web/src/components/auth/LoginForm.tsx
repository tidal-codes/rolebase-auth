import { AnimatePresence, motion } from "motion/react";
import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import FormContainer from "./FormContainer";
import type { AuthStage } from "../../@types/auth";
import Field from "../ui/field";

interface LoginFormProps {
    setStage: React.Dispatch<React.SetStateAction<AuthStage>>
}

const MotionDiv = motion.create(Box);

const LoginForm = ({ setStage }: LoginFormProps) => {
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [email, setEmail] = useState("");
    const [password, usePassword] = useState("");

    return (
        <FormContainer>
            <Field
                placeholder="enter your email"
                label={null}
                value={email}
                setValue={setEmail}
            />

            {/* --- انیمیت ظاهر شدن فیلد پسورد --- */}
            <AnimatePresence mode="popLayout">
                {showPasswordInput && (
                    <MotionDiv
                        key="password-field"
                        layout
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                        <Field
                            placeholder="enter your password"
                            label={null}
                            value={password}
                            setValue={usePassword}
                        />
                    </MotionDiv>
                )}
            </AnimatePresence>

            <Button
                w="full"
                onClick={() =>
                    setTimeout(() => setShowPasswordInput(true), 200)
                }
            >
                submit
            </Button>
        </FormContainer>
    );
};

export default LoginForm;



