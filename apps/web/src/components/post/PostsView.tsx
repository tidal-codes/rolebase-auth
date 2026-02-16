import { Box, For, Grid } from '@chakra-ui/react';
import PostCard from './PostCard';
import { usePosts } from '../../hooks/post/queries';
import { usePostStore } from '../../stores/posts';
import { useSearchStore } from '../../stores/search';

const PostsView = () => {
    const { isLoading } = usePosts();
    const postIds = usePostStore(state => state.postIds);
    const postsById = usePostStore(state => state.postsById);
    const search = useSearchStore(state => state.search);
    const setSearchResultCount = useSearchStore(state => state.setSearchResultCount);

    function getPosts() {
        const query = search.trim().toLowerCase();

        if (!query) return postIds;

        const filteredPostIds = postIds.filter(id => {
            const post = postsById[id];
            return post.title.toLowerCase().includes(query);
        });
        setSearchResultCount(filteredPostIds.length);
        return filteredPostIds;
    }

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
                        <For each={getPosts()}>
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
