import { useEffect } from "react";
import { usePostStore } from "../../stores/posts";
import { usePosts } from "./queries";

export default function useSyncPostStore() {
    const { data } = usePosts();
    const setPosts = usePostStore(state => state.setPosts);

    useEffect(() => {
        if (data) {
            setPosts(data.data.data);
        }
    }, [data, setPosts])
}