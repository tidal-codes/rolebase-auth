import { Box, Grid } from '@chakra-ui/react';
import PostCard from './PostCard';

const PostsView = () => {
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
                    xl: "repeat(5, 1fr)",
                }}
                gap={6}
            >
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </Grid>
        </Box>
    );
}

export default PostsView;
