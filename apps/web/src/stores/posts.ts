import { create } from "zustand";
import type { PostStore, PostViewStore } from "../@types/post";

export const usePostStore = create<PostStore>((set) => ({

    postIds: [],
    postsById: {},

    setPosts: (posts) =>
        set(() => ({
            postIds: posts.map((post) => post.id),
            postsById: posts.reduce<PostStore["postsById"]>((acc, post) => {
                acc[post.id] = post;
                return acc;
            }, {})
        })),

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
            const currentPost = state.postsById[postId];
            if (!currentPost) return state;
            return {
                postsById: {
                    ...state.postsById,
                    [postId]: {
                        ...currentPost,
                        ...postParams
                    }
                }
            }
        }),

    removePost: (postId) =>
        set((state) => {
            const { [postId]: removed, ...rest } = state.postsById;
            if (!removed) return state;
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