import type { UseFormHandleSubmit, UseFormReset } from "react-hook-form";
import type { PostForm } from "../../@types/post";
import { useAddPost } from "./queries";
import usePostDialog from "./usePostDialog";

interface UsePostEditorProps {
    handleSubmit: UseFormHandleSubmit<PostForm>;
    reset: UseFormReset<PostForm>
}

export default function usePostEditor(props: UsePostEditorProps) {
    const { open, handleOpen } = usePostDialog();
    const { add } = useAddPost();

    function handleAddPost(data: PostForm) {
        add({ title: data.title, body: data.postText })
        handleOpen(false);
        setTimeout(() => {
            props.reset();
        }, 300);
    }

    const addPost = props.handleSubmit(handleAddPost);

    return {
        openDialog: open,
        setOpenDialog: handleOpen,
        addPost
    }

}