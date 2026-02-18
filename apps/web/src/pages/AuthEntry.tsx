import { Box } from "@chakra-ui/react";
import AuthWrapper from "../components/auth/AuthWrapper";
import LoginForm from "../components/auth/LoginForm";
import { useState } from "react";
import RegisterForm from "../components/auth/RegisterForm";
import VerificationCodeForm from "../components/auth/VerificationCodeForm";
import StageBack from "../components/auth/StageBack";
import useStage from "../hooks/auth/useStage";

const AuthEntry = () => {
    const { stage, setStage } = useStage();
    const [email, setEmail] = useState<string>("");

    return (
        <AuthWrapper>
            {stage === "REGISTER" && <StageBack setStage={setStage} />}
            <Box
                w="full"
                maxW="sm"
                px={{
                    mdDown: "5"
                }}
            >
                {stage === "LOGIN" && (
                    <LoginForm
                        email={email}
                        setEmail={setEmail}
                        setStage={setStage}
                    />
                )}
                {stage === "REGISTER" && (
                    <RegisterForm
                        email={email}
                        setStage={setStage}
                    />
                )}
                {
                    stage === "VERIFY-EMAIL" && (
                        <VerificationCodeForm
                            setStage={setStage}
                            email={email} />
                    )
                }
            </Box>
        </AuthWrapper >
    );
}

export default AuthEntry;
