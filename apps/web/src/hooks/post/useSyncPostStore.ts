import { useEffect } from "react";
import { usePostStore } from "../../stores/posts";
import { usePosts } from "./queries";

export default function useSyncPostStore() {
    const { data } = usePosts();
    const addPost = usePostStore(state => state.addPost);

    useEffect(() => {
        if (data) {
            data.data.data.forEach(post => addPost(post))
        }
    }, [data])
}