import { Box, Button, Flex } from "@chakra-ui/react";
import Dialog from "../ui/dialog";
import usePostDialog from "../../hooks/post/usePostDialog";
import Field from "../ui/field";
import { usePostForm } from "../../hooks/post/forms";
import usePostEditor from "../../hooks/post/usePostEditor";

const PostDialog = () => {
    const { open, handleOpen } = usePostDialog();
    const { register, reset, handleSubmit, errors } = usePostForm();
    const { addPost } = usePostEditor({ handleSubmit });
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
                    <Field
                        register={register}
                        field="title"
                        invalid={Boolean(errors.title?.message)}
                        errorText={errors.title?.message}
                        label={null}
                        placeholder="title"
                    />
                    <Field
                        register={register}
                        field="postText"
                        invalid={Boolean(errors.postText?.message)}
                        errorText={errors.postText?.message}
                        label={null}
                        textarea
                        textAreaProps={{
                            placeholder: "write your post",
                            resize: "none",
                            h: "220px"
                        }}
                    />
                    <Flex
                        gap="2"
                        mt="9"
                        pt="3"
                        borderTop="1px solid"
                        borderColor="border"
                    >
                        <Button
                            size="xs"
                            onClick={() => addPost()}
                        >
                            publish
                        </Button>
                        <Button
                            variant="subtle"
                            size="xs"
                            onClick={() => {
                                handleOpen(false);
                                setTimeout(() => {
                                    reset();
                                }, 300);
                            }}
                        >
                            cancel
                        </Button>
                    </Flex>
                </Flex>
            </Box>
        </Dialog>
    );
}

export default PostDialog;
