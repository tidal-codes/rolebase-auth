import { create } from "zustand";
import type { PostStore } from "../@types/post";

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
        
    updatePost: (post) =>
        set((state) => ({
            postsById: {
                ...state.postsById,
                [post.id]: post
            }
        })),

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
