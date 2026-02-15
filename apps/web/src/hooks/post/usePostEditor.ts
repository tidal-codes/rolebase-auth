import type { UseFormHandleSubmit } from "react-hook-form";
import type { PostForm } from "../../@types/post";

interface UsePostEditorProps {
    handleSubmit: UseFormHandleSubmit<PostForm>
}

export default function usePostEditor(props: UsePostEditorProps) {

    function handleAddPost(data: PostForm) {
        console.log(data)
    }

    const addPost = props.handleSubmit(handleAddPost);

    return {
        addPost
    }

}