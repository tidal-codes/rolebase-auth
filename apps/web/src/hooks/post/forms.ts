import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { PostForm } from "../../@types/post";
import usePostDialog from "./usePostDialog";
import { usePostStore } from "../../stores/posts";
import { useEffect } from "react";

export const postSchema = z.object({
    title: z.string().min(6),
    postText: z.string().min(16)
})

export function usePostForm() {
    const { defaultPostId } = usePostDialog();
    const postsById = usePostStore(state => state.postsById);
    const post = defaultPostId ? postsById[defaultPostId] : null;

    const { register, handleSubmit, reset, formState: { errors } } = useForm<PostForm>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            postText: ""
        }
    })

    useEffect(() => {
        if (post) {
            reset({
                title: post.title,
                postText: post.body
            });
        } else {
            reset({
                title: "",
                postText: ""
            })
        }
    }, [post, reset]);

    return {
        register,
        handleSubmit,
        reset,
        errors
    }
}