import { createContext, useCallback, useState, type ReactNode } from "react";
import type { PostDialogContextType } from "../../@types/post";

export const PostDialogContext = createContext<PostDialogContextType | null>(null);

export const PostDialogProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = useCallback((open: boolean) => {
        setOpen(open)
    }, []);

    const toggleOpen = useCallback(() => {
        setOpen(prev => !prev)
    }, []);

    return (
        <PostDialogContext value={{ open, handleOpen, toggleOpen }}>
            {children}
        </PostDialogContext>
    )
} 