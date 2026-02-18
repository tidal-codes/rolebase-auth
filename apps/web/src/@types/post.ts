import type { z } from "zod"
import type { postSchema } from "../hooks/post/forms"
import type { Dispatch, SetStateAction } from "react";

export interface PostDialogContextType {
    open: boolean,
    defaultPostId: string | null,
    handleOpen: (open: boolean, defaultPostId?: string) => void,
    toggleOpen: () => void
}
export interface PostViewDialogContextType {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>;
    postId: string | null;
    handleOpenPost: (postId: string) => void
}
export type PostForm = z.infer<typeof postSchema>;

export interface Post {
    id: string;
    user_id: string;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
    liked: boolean;
    saved: boolean;
    pending?: boolean;
    author: {
        id: string;
        full_name: string;
    }
}

export interface PostStore {
    postIds: string[];
    postsById: Record<string, Post>;
    setPosts: (posts: Post[]) => void;
    addPost: (post: Post) => void;
    updatePost: (postId: string, postParams: Partial<Post>) => void;
    removePost: (postId: string) => void;

    setPostLiked: (id: string, liked: boolean) => void;
    setPostSaved: (id: string, saved: boolean) => void;
}

export interface SearchStore {
    search: string;
    searchResultCount: number,
    setSearch: (search: string) => void
    setSearchResultCount: (number: number) => void
}

export type PostView = "All" | "Liked" | "Saved";

export interface PostViewStore {
    view: PostView
    setView: (view: PostView) => void
}

// ------ Responses ---------

export interface GetPostsResponse {
    success: boolean;
    data: Post[]
}
export interface GetPostResponse {
    success: boolean;
    data: Post
}