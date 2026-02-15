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
                    xl: "repeat(4, 1fr)",
                }}
                gap={3}
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
