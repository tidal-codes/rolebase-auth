import { useContext } from "react";
import { PostViewDialogContext } from "../../contexts/post/PostViewDialogProvider";


export default function usePostViewDialog() {
    const ctx = useContext(PostViewDialogContext);
    if (!ctx) throw new Error("PostViewDialogProvider is missing!");
    return ctx;
}