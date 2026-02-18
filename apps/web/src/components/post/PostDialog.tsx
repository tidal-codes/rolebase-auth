import { Box, Button, Flex } from "@chakra-ui/react";
import Dialog from "../ui/dialog";
import Field from "../ui/field";
import { usePostForm } from "../../hooks/post/forms";
import usePostEditor from "../../hooks/post/usePostEditor";

const PostDialog = () => {
    const { register, reset, handleSubmit, errors } = usePostForm();
    const {
        submit,
        openDialog,
        defaultPostId,
        setOpenDialog
    } = usePostEditor({ handleSubmit, reset });
    return (
        <Dialog
            open={openDialog}
            setOpen={setOpenDialog}
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
                            onClick={() => {
                                submit();
                            }}
                        >
                            {defaultPostId ? "update" : "publish"}
                        </Button>
                        <Button
                            variant="subtle"
                            size="xs"
                            onClick={() => {
                                setOpenDialog(false);
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
