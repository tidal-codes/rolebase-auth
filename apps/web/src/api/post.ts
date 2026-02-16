import type { GetPostResponse, GetPostsResponse } from "../@types/post"
import { api } from "../libs/client"

export const postApi = {
    addNewPost: (body: { title: string, body: string }) => {
        return api.post<GetPostResponse>("posts", body)
    },
    getPosts: () => {
        return api.get<GetPostsResponse>("posts")
    }
}
