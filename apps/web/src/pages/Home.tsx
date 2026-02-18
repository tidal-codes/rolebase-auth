import { Box, Flex } from '@chakra-ui/react';
import HomeHeader from '../components/HomeHeader';
import PostsView from '../components/post/PostsView';
import PostDialog from '../components/post/PostDialog';
import { PostDialogProvider } from '../contexts/post/PostDialogProvider';
import PatternBackground from '../components/PatternBackground';
import useSyncPostStore from '../hooks/post/useSyncPostStore';
import SearchedSection from '../components/post/SearchedSection';
import ExpiredSessionDialog from '../components/auth/ExpiredSessionDialog';
import { PostViewDialogProvider } from '../contexts/post/PostViewDialogProvider';
import PostViewDialog from '../components/post/PostViewDialog';

const Home = () => {
    useSyncPostStore();
    return (
        <Box w="full" h="100vh">
            <PatternBackground>
                <Flex
                    flexDir="column"
                    w="full"
                    h="full"
                    gap="5"
                    py="5"
                    px={{
                        base: "3",
                        md: "6",
                        lg: "20"
                    }}
                >
                    <ExpiredSessionDialog />
                    <PostDialogProvider>
                        <PostViewDialogProvider>
                            <PostViewDialog />
                            <Box>
                                <HomeHeader />
                            </Box>
                            <Box>
                                <SearchedSection />
                            </Box>
                            <Box flex="1">
                                <PostsView />
                            </Box>
                            <PostDialog />
                        </PostViewDialogProvider>
                    </PostDialogProvider>
                </Flex>
            </PatternBackground>
        </Box>

    );
}

export default Home;
