import { Box, Flex } from '@chakra-ui/react';
import HomeHeader from '../components/HomeHeader';
import PostsView from '../components/post/PostsView';
import PostDialog from '../components/post/PostDialog';
import { PostDialogProvider } from '../contexts/post/PostDialogProvider';

const Home = () => {
    return (
        <Box w="full" h="100vh">
            <Flex
                flexDir="column"
                w="full"
                h="full"
                gap="5"
                p="5"
            >
                <PostDialogProvider>
                    <Box>
                        <HomeHeader />
                    </Box>
                    <Box flex="1">
                        <PostsView />
                    </Box>
                    <PostDialog />
                </PostDialogProvider>
            </Flex>
        </Box>

    );
}

export default Home;
