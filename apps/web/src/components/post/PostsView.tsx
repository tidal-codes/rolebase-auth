import { Box, Flex, For, Grid, Text } from '@chakra-ui/react';
import { usePosts } from '../../hooks/post/queries';
import { usePostViewStore } from '../../stores/posts';
import SegmentGroup from '../ui/segmentGroup';
import type { PostView } from '../../@types/post';
import PostCard from './PostCard';
import useFilteredPosts from '../../hooks/post/useFilteredPosts';
import { useEffect, useState, useTransition } from 'react';

const PostsView = () => {
    const { isLoading } = usePosts();
    const setView = usePostViewStore(state => state.setView);
    const [, startTransition] = useTransition();
    const view = usePostViewStore(state => state.view);
    const [segmentValue, setSegmentValue] = useState<PostView>(view);
    const filteredPosts = useFilteredPosts(view);

    useEffect(() => {
        setSegmentValue(view);
    }, [view]);

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
                    value={segmentValue}
                    setValue={(value) => {
                        const nextView = value as PostView;
                        setSegmentValue(nextView);
                        startTransition(() => {
                            setView(nextView)
                        })
                    }}
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
                                base: "repeat(1, minmax(0, 1fr))",
                                md: "repeat(3, minmax(0, 1fr))",
                                xl: "repeat(4, minmax(0, 1fr))",
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
                            <Text>No items found.</Text>
                        </Flex>
                    )
                )
            }
        </Flex >
    );
}

export default PostsView;
