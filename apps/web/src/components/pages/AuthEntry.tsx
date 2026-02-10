import { Box, Flex } from "@chakra-ui/react";
import AuthWrapper from "../auth/AuthWrapper";
import LoginForm from "../auth/LoginForm";
import { useLayoutEffect, useRef, useState } from "react";
import PasswordForm from "../auth/PasswordForm";
import type { AuthStage } from "../../@types/auth";
import Register from "../auth/Register";
import { AnimateChangeInHeight } from "../AnimateChangeInHeight";


const AuthEntry = () => {
    const [stage, setStage] = useState<AuthStage>("LOGIN");
    const heightRef = useRef<number | "auto">("auto");
    const containerRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        heightRef.current = container.offsetHeight;
    }, [stage])

    return (
        <AuthWrapper>
            <Box
                w="full"
                maxW="sm"
            >
                {stage === "LOGIN" && (
                    <LoginForm setStage={setStage} />
                )}
                {stage === "REGISTER" && (
                    <Register />
                )}
            </Box>
        </AuthWrapper >
    );
}

export default AuthEntry;
