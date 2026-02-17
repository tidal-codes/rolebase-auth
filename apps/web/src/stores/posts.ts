import { create } from "zustand";
import type { PostStore, PostViewStore } from "../@types/post";

export const usePostStore = create<PostStore>((set) => ({

    postIds: [],
    postsById: {},

    addPost: (post) =>
        set((state) => ({
            postIds: state.postIds.includes(post.id)
                ? state.postIds
                : [...state.postIds, post.id],
            postsById: {
                ...state.postsById,
                [post.id]: post
            }
        })),

    updatePost: (postId, postParams) =>
        set((state) => {
            const { [postId]: post, ...rest } = state.postsById;
            return {
                postsById: {
                    ...rest,
                    [postId]: {
                        ...post,
                        ...postParams
                    }
                }
            }
        }),

    removePost: (postId) =>
        set((state) => {
            const { [postId]: removed, ...rest } = state.postsById;
            return {
                postIds: state.postIds.filter(id => id !== postId),
                postsById: rest
            };
        }),

    setPostLiked: (id, liked) =>
        set((state) => ({
            postsById: {
                ...state.postsById,
                [id]: {
                    ...state.postsById[id],
                    liked
                }
            }
        })),

    setPostSaved: (id, saved) =>
        set((state) => ({
            postsById: {
                ...state.postsById,
                [id]: {
                    ...state.postsById[id],
                    saved
                }
            }
        })),
}));

export const usePostViewStore = create<PostViewStore>(set => ({
    view: "All",
    setView: (view) => set(() => ({
        view
    }))
}))