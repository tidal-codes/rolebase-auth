import { Box, For, Grid } from '@chakra-ui/react';
import PostCard from './PostCard';
import { usePosts } from '../../hooks/post/queries';
import { usePostStore } from '../../stores/posts';

const PostsView = () => {
    const { isLoading } = usePosts();
    const postIds = usePostStore(state => state.postIds);
    return (
        <Box
            w="full"
            h="full"
            py="3"
        >
            <Grid
                templateColumns={{
                    base: "1fr",
                    md: "repeat(3, 1fr)",
                    xl: "repeat(4, 1fr)",
                }}
                gap={3}
            >
                {
                    isLoading ? (
                        "isLoading"
                    ) : (
                        <For each={postIds}>
                            {(id) => {
                                return <PostCard
                                    key={id}
                                    postId={id}
                                />
                            }}
                        </For>
                    )
                }

            </Grid>
        </Box>
    );
}

export default PostsView;
