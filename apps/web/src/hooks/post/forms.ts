import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { PostForm } from "../../@types/post";

export const postSchema = z.object({
    title: z.string().min(6),
    postText: z.string().min(16)
})

export function usePostForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<PostForm>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            postText: ""
        }
    })

    return {
        register,
        handleSubmit,
        reset,
        errors
    }
}