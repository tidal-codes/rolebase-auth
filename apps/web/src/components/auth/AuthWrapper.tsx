import { Box } from '@chakra-ui/react';
import PatternBackground from '../PatternBackground';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            w="full"
            h="100vh"
            bgColor="white"
            fontFamily="body"
            position="relative"
        >
            <PatternBackground>
                {children}
            </PatternBackground>
        </Box>
    );
}

export default AuthWrapper;
