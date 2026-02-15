import type { z } from "zod"
import type { postSchema } from "../hooks/post/forms"

export interface PostDialogContextType {
    open: boolean,
    handleOpen: (open: boolean) => void,
    toggleOpen: () => void
}
export type PostForm = z.infer<typeof postSchema>;