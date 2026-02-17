import { useEffect, useState } from "react";
import { usePostStore, usePostViewStore } from "../../stores/posts";
import { useSearchStore } from "../../stores/search";

export default function useFilteredPosts() {
    const { view } = usePostViewStore();
    const { search, setSearchResultCount } = useSearchStore();
    const postIds = usePostStore(state => state.postIds);
    const postsById = usePostStore(state => state.postsById);
    const [filteredPosts, setFilteredPosts] = useState<string[]>([]);


    useEffect(() => {
        const filteredByView = postIds.filter(id => {
            const post = postsById[id];
            if (!post) return false;

            if (view === "Liked") return post.liked;
            if (view === "Saved") return post.saved;
            return true;
        });

        const query = search.trim().toLowerCase();
        if (!query) {
            setFilteredPosts(filteredByView);
            return;
        }
        const filteredPostIds = query
            ? filteredByView.filter(id => postsById[id]?.title.toLowerCase().includes(query))
            : filteredByView;

        setFilteredPosts(filteredPostIds);
    }, [view, search, postIds, postsById]);


    useEffect(() => {
        setSearchResultCount(filteredPosts.length)
    }, [filteredPosts])

    return filteredPosts;
}
