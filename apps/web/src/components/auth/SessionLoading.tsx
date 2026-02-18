import { Flex, Text, Spinner } from '@chakra-ui/react';

const SessionLoading = () => {
    return (
        <Flex
            w="full"
            h="100vh"
            alignItems="center"
            justifyContent="center"
        >
            <Flex
                flexDir="column"
                gap="1.5"
                alignItems="center"
            >
                <Spinner size="lg" />
                <Text>Loading Session ...</Text>
            </Flex>
        </Flex>
    );
}

export default SessionLoading;
