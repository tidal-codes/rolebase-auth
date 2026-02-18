import { useMutation, useQuery } from "@tanstack/react-query";
import { postApi } from "../../api/post";
import { usePostStore } from "../../stores/posts";
import type { Post } from "../../@types/post";
import useAuth from "../auth/useAuth";
import { toast } from "../../utils/toaster";

export function usePosts() {
    const { data, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: postApi.getPosts,
        refetchOnWindowFocus: true
    })

    return {
        data,
        isLoading
    }
}

export function useAddPost() {
    const addPost = usePostStore(state => state.addPost);
    const removePost = usePostStore(state => state.removePost);
    const { user } = useAuth();

    const mutation = useMutation({
        mutationFn: ({ title, body }: { title: string; body: string }) => postApi.addNewPost({ title, body }),

        onMutate: async ({ title, body }) => {
            const tempId = crypto.randomUUID();

            const tempPost: Post = {
                id: tempId,
                title,
                body,
                user_id: user!.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                liked: false,
                saved: false,
                pending: true,
                author: {
                    id: user!.id,
                    full_name: user!.fullName
                }
            };

            addPost(tempPost);
            return { tempId };
        },

        onError: (_error, _variables, context) => {
            if (context?.tempId) removePost(context.tempId);
            toast.error(_error.message);
        },

        onSuccess: (data, _variables, context) => {
            if (context?.tempId) removePost(context.tempId);
            addPost(data.data.data);
        }
    });

    return {
        add: mutation.mutate,
        isPending: mutation.isPending,
    };
}

export function useLike() {
    const updatePost = usePostStore(state => state.updatePost);
    const mutation = useMutation({
        mutationFn: ({ postId, liked }: { postId: string, liked: boolean }) => postApi.like({ postId, liked }),
        onMutate: ({ postId, liked }) => {
            updatePost(postId, { liked })
        },
        onError: (error, variables) => {
            updatePost(variables.postId, { liked: !variables.liked })
            toast.error(error.message)
        },

    })

    return {
        like: mutation.mutate,
    }
}
export function useBookmark() {
    const updatePost = usePostStore(state => state.updatePost);
    const mutation = useMutation({
        mutationFn: ({ postId, saved }: { postId: string, saved: boolean }) => postApi.bookmark({ postId, saved }),
        onMutate: ({ postId, saved }) => {
            updatePost(postId, { saved })
        },
        onError: (error, variables) => {
            updatePost(variables.postId, { saved: !variables.saved })
            toast.error(error.message)
        },

    })

    return {
        save: mutation.mutate,
    }
}

export function useDeletePost(postId: string) {
    const removePost = usePostStore(state => state.removePost);
    const addPost = usePostStore(state => state.addPost);
    const getPost = usePostStore.getState;

    const mutation = useMutation({
        mutationFn: () => postApi.delete({ postId }),

        onMutate: () => {
            const current = getPost().postsById[postId];
            removePost(postId);
            return { current };
        },

        onError: (error, _, ctx) => {
            if (ctx?.current) {
                addPost(ctx.current);
            }
            toast.error(error.message);
        },
    });

    return {
        deletePost: mutation.mutate,
    };
}


export function useUpdatePost() {
    const updatePost = usePostStore(state => state.updatePost);
    const postsById = usePostStore(state => state.postsById);
    const mutation = useMutation({
        mutationFn: ({ postId, title, body }: { postId: string, title: string, body: string }) => {
            return postApi.update({ id: postId, body, title })
        },
        onMutate: ({ postId, title, body }) => {
            updatePost(postId, { body, title, pending: true });
            return { post: postsById[postId] };
        },
        onError: (error, _var, context) => {
            updatePost(context!.post.id, { title: context!.post.title, body: context!.post.body, pending: false });
            toast.error(error.message);
        },
        onSuccess: (_data, _var, context) => {
            updatePost(context!.post.id, { pending: false })
        }
    })

    return {
        updatePost: mutation.mutate,
    }
}