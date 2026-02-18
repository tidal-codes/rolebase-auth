import { useEffect, useMemo } from "react";
import { usePostStore } from "../../stores/posts";
import { useSearchStore } from "../../stores/search";
import type { PostView } from "../../@types/post";

export default function useFilteredPosts(view: PostView) {
    const search = useSearchStore(state => state.search);
    const setSearchResultCount = useSearchStore(state => state.setSearchResultCount);
    const postIds = usePostStore(state => state.postIds);
    const postsById = usePostStore(state => state.postsById);


    const filteredPosts = useMemo(() => {
        const filteredByView = postIds.filter(id => {
            const post = postsById[id];
            if (!post) return false;

            if (view === "Liked") return post.liked;
            if (view === "Saved") return post.saved;
            return true;
        });

        const query = search.trim().toLowerCase();

        if (!query) return filteredByView;
        return filteredByView.filter(id => postsById[id]?.title.toLowerCase().includes(query));
    }, [view, search, postIds, postsById]);




    useEffect(() => {
        setSearchResultCount(filteredPosts.length)
    }, [filteredPosts.length, setSearchResultCount])

    return filteredPosts;
}
