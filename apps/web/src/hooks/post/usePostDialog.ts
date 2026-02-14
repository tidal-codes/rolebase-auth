import { useContext } from "react";
import { PostDialogContext } from "../../contexts/post/PostDialogProvider";

export default function usePostDialog() {
    const ctx = useContext(PostDialogContext);
    if (!ctx) throw new Error("postDialogProvider is missing!");
    return ctx;
}