import type { GetPostResponse, GetPostsResponse } from "../@types/post"
import { api } from "../libs/client"

export const postApi = {
    addNewPost: (body: { title: string, body: string }) => {
        return api.post<GetPostResponse>("posts", body)
    },
    getPosts: () => {
        return api.get<GetPostsResponse>("posts")
    },
    like: (body: { liked: boolean, postId: string }) => {
        return api.post(`posts/${body.postId}/likes`, body)
    },
    bookmark : (body : {saved : boolean , postId : string}) => {
        return api.post(`posts/${body.postId}/bookmarks`, body)
    }
}
