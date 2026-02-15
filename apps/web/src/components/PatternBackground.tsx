import { Box, Flex } from '@chakra-ui/react';
import { type ReactNode } from 'react';

const PatternBackground = ({ children }: { children: ReactNode }) => {
    return (
        <Box
            w="full"
            h="full"
            backgroundImage={`url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");`}
        >
            <Flex
                w="full"
                h="full"
                bgGradient="radial-gradient(circle, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,1) 100%)"
                alignItems="center"
                justifyContent="center"
            >
                {children}
            </Flex>
        </Box>
    );
}

export default PatternBackground;
