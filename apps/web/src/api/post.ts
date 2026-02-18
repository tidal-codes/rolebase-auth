import type { GetPostResponse, GetPostsResponse, Post } from "../@types/post"
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
    bookmark: (body: { saved: boolean, postId: string }) => {
        return api.post(`posts/${body.postId}/bookmarks`, body)
    },
    delete: ({ postId }: { postId: string }) => {
        return api.delete(`posts/${postId}`)
    },
    update: (body: { id: string, title: string, body: string }) => {
        return api.put(`posts/${body.id}`, body);
    }
}
