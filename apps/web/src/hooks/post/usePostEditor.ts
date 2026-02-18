import type { UseFormHandleSubmit, UseFormReset } from "react-hook-form";
import type { PostForm } from "../../@types/post";
import { useAddPost, useUpdatePost } from "./queries";
import usePostDialog from "./usePostDialog";

interface UsePostEditorProps {
    handleSubmit: UseFormHandleSubmit<PostForm>;
    reset: UseFormReset<PostForm>
}

export default function usePostEditor(props: UsePostEditorProps) {
    const { open, defaultPostId, handleOpen } = usePostDialog();
    const { add } = useAddPost();
    const { updatePost } = useUpdatePost();

    function handleAddPost(data: PostForm) {
        add({ title: data.title, body: data.postText })
        handleOpen(false);
        setTimeout(() => {
            props.reset();
        }, 300);
    }
    function handleUpdatePost(data: PostForm) {
        updatePost({ postId: defaultPostId!, title: data.title, body: data.postText });
        handleOpen(false);
    }

    const submit = defaultPostId ? props.handleSubmit(handleUpdatePost) : props.handleSubmit(handleAddPost);

    return {
        openDialog: open,
        setOpenDialog: handleOpen,
        defaultPostId,
        submit
    }

}