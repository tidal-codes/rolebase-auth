import { api } from "../libs/client"

export const postApi = {
    addNewPost : () => {
        return api.post("posts")
    },
    updatePost : () => {
        return api.post("")
    }
}

postsRouter.get('/', asyncHandler(listPostsHandler));
postsRouter.post('/', asyncHandler(createPostHandler));
postsRouter.post('/:postId/likes', asyncHandler(likePostHandler));
postsRouter.post('/:postId/bookmarks', asyncHandler(bookmarkPostHandler));
postsRouter.get('/likes', asyncHandler(listLikesHandler));
postsRouter.get('/bookmarks', asyncHandler(listBookmarksHandler));