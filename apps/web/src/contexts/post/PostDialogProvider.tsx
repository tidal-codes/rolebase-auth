import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import type { PostDialogContextType } from "../../@types/post";

export const PostDialogContext = createContext<PostDialogContextType | null>(null);

export const PostDialogProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [defaultPostId, setDefaultPostId] = useState<string | null>(null);

    const handleOpen = useCallback((open: boolean, defaultPostId?: string) => {
        setOpen(open);
        if (defaultPostId) {
            setDefaultPostId(defaultPostId);
        }
    }, []);

    const toggleOpen = useCallback(() => {
        setOpen(prev => !prev)
    }, []);

    useEffect(() => {
        if (!open) {
            setDefaultPostId(null);
        }
    }, [open])

    return (
        <PostDialogContext value={{ open, handleOpen, defaultPostId, toggleOpen }}>
            {children}
        </PostDialogContext>
    )
} 