import { create } from "zustand";
import type { SearchStore } from "../@types/post";

export const useSearchStore = create<SearchStore>((set) => ({
    search: "",
    searchResultCount: 0,
    setSearch: (search) => set(() => ({
        search
    })),
    setSearchResultCount: (number) => set(() => ({
        searchResultCount: number
    }))
}))