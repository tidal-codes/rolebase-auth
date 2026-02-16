import type { UseFormHandleSubmit } from "react-hook-form";
import type { PostForm } from "../../@types/post";
import { useAddPost } from "./queries";

interface UsePostEditorProps {
    handleSubmit: UseFormHandleSubmit<PostForm>
}

export default function usePostEditor(props: UsePostEditorProps) {

    const { add } = useAddPost();

    function handleAddPost(data: PostForm) {
        add({ title: data.title, body: data.postText })
    }

    const addPost = props.handleSubmit(handleAddPost);

    return {
        addPost
    }

}