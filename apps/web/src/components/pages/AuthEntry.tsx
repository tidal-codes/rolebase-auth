import { Box } from "@chakra-ui/react";
import AuthWrapper from "../auth/AuthWrapper";
import LoginForm from "../auth/LoginForm";
import { useState } from "react";
import type { AuthStage } from "../../@types/auth";
import RegisterForm from "../auth/RegisterForm";
import VerificationCodeForm from "../auth/VerificationCodeForm";



const AuthEntry = () => {
    const [stage, setStage] = useState<AuthStage>("LOGIN");
    const [email, setEmail] = useState<string>("");

    return (
        <AuthWrapper>
            <Box
                w="full"
                maxW="sm"
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
                        <VerificationCodeForm email={email}/>
                    )
                }
            </Box>
        </AuthWrapper >
    );
}

export default AuthEntry;
