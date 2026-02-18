import Dialog from "../ui/dialog";
import { Box, Flex, Text } from "@chakra-ui/react";
import usePostViewDialog from "../../hooks/post/usePostViewDialog";
import { usePostStore } from "../../stores/posts";


const PostViewDialog = () => {
    const { open, setOpen, postId } = usePostViewDialog();
    const post = usePostStore(state => postId ? state.postsById[postId] : null);

    return (
        <Dialog
            open={open}
            setOpen={setOpen}
        >
            <Flex
                flexDir="column"
                gap="2"
                p="3"
            >
                <Text my="2" fontSize="2xl">{post?.title}</Text>
                <Box
                    bgColor="bg.muted"
                    rounded="md"
                    p="3"
                    h="220px"
                    overflowY="auto">
                    <Text>{post?.body}</Text>
                </Box>
            </Flex>
        </Dialog>
    );
}

export default PostViewDialog;
