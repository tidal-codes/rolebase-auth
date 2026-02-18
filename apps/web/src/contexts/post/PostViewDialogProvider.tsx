import { createContext, useState, type ReactNode } from "react";
import type { PostViewDialogContextType } from "../../@types/post";

export const PostViewDialogContext = createContext<PostViewDialogContextType | null>(null);

export function PostViewDialogProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const [postId, setPostId] = useState<string | null>(null);
    function handleOpenPost(postId: string) {
        setOpen(true);
        setPostId(postId);
    }
    return (
        <PostViewDialogContext value={{ open, setOpen, postId, handleOpenPost }}>
            {children}
        </PostViewDialogContext>
    )
}