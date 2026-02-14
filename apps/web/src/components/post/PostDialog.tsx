import { Box, Button, Flex, Input, Textarea } from "@chakra-ui/react";
import Dialog from "../ui/dialog";
import usePostDialog from "../../hooks/post/usePostDialog";

const PostDialog = () => {
    const { open, handleOpen } = usePostDialog();
    return (
        <Dialog
            open={open}
            setOpen={handleOpen}
        >
            <Box
                p="4"
                border="1px solid"
                borderColor="border"
            >
                <Flex
                    gap="2"
                    flexDirection="column"
                >
                    <Input placeholder="enter post title" />
                    <Textarea
                        placeholder="write your post"
                        h="220px"
                        resize="none"
                    />
                    <Flex gap="2">
                        <Button size="xs">publish</Button>
                        <Button variant="subtle" size="xs">cancel</Button>
                    </Flex>
                </Flex>
            </Box>
        </Dialog>
    );
}

export default PostDialog;
