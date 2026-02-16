import { Box, Flex, For, Grid } from '@chakra-ui/react';
import { usePosts } from '../../hooks/post/queries';
import { usePostStore, usePostViewStore } from '../../stores/posts';
import { useSearchStore } from '../../stores/search';
import SegmentGroup from '../ui/segmentGroup';
import type { PostView } from '../../@types/post';
import PostCard from './PostCard';

const PostsView = () => {
    const { isLoading } = usePosts();
    const postIds = usePostStore(state => state.postIds);
    const postsById = usePostStore(state => state.postsById);
    const search = useSearchStore(state => state.search);
    const setSearchResultCount = useSearchStore(state => state.setSearchResultCount);
    const setView = usePostViewStore(state => state.setView);
    const view = usePostViewStore(state => state.view);

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
        </Flex>
    );
}

export default PostsView;
