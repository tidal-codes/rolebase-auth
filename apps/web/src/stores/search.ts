import { create } from "zustand";
import type { SearchStore } from "../@types/post";

export const useSearchStore = create<SearchStore>((set) => ({
    search: "",
    searchResultCount: 0,
    setSearch: (search) => set((state) => {
        if (state.search === search) return state;
        return { search };
    }),
    setSearchResultCount: (number) => set((state) => {
        if (state.searchResultCount === number) return state;
        return {
            searchResultCount: number
        };
    })
}))