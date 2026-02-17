import { Box, Flex, For, Grid, Text } from '@chakra-ui/react';
import { usePosts } from '../../hooks/post/queries';
import { usePostViewStore } from '../../stores/posts';
import SegmentGroup from '../ui/segmentGroup';
import type { PostView } from '../../@types/post';
import PostCard from './PostCard';
import useFilteredPosts from '../../hooks/post/useFilteredPosts';

const PostsView = () => {
    const { isLoading } = usePosts();
    const setView = usePostViewStore(state => state.setView);
    const view = usePostViewStore(state => state.view);
    const filteredPosts = useFilteredPosts();

    return (
        <Flex
            w="full"
            h="full"
            flexDir="column"
            gap="5"
            py="3"
        >
            <Box>
                <SegmentGroup
                    value={view}
                    setValue={(value) => setView(value as PostView)}
                    items={["All", "Liked", "Saved"] as PostView[]}
                />
            </Box>
            {
                isLoading ? (
                    <Flex
                        w="full"
                        h="full"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text>loading data ...</Text>
                    </Flex>
                ) : (
                    filteredPosts.length ? (
                        <Grid
                            templateColumns={{
                                base: "1fr",
                                md: "repeat(3, 1fr)",
                                xl: "repeat(4, 1fr)",
                            }}
                            gap={3}
                        >
                            <For each={filteredPosts}>
                                {(id) => {
                                    return <PostCard
                                        key={id}
                                        postId={id}
                                    />
                                }}
                            </For>
                        </Grid>
                    ) : (
                        <Flex
                            w="full"
                            h="full"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text>NO ITEMS WERE FOUND</Text>
                        </Flex>
                    )
                )
            }
        </Flex >
    );
}

export default PostsView;
