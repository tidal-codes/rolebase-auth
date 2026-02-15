import { Router } from 'express';
import { asyncHandler } from '../../middleware/async-handler.js';
import { requireAuth } from '../../middleware/auth.js';
import {
  bookmarkPostHandler,
  createPostHandler,
  deletePostHandler,
  likePostHandler,
  listBookmarksHandler,
  listLikesHandler,
  listPostsHandler,
  removeBookmarkHandler,
  unlikePostHandler,
  updatePostHandler
} from './posts.controller.js';

export const postsRouter = Router();

postsRouter.use(requireAuth);

postsRouter.get('/', asyncHandler(listPostsHandler));
postsRouter.post('/', asyncHandler(createPostHandler));
postsRouter.put('/:postId', asyncHandler(updatePostHandler));
postsRouter.delete('/:postId', asyncHandler(deletePostHandler));
postsRouter.post('/:postId/likes', asyncHandler(likePostHandler));
postsRouter.delete('/:postId/likes', asyncHandler(unlikePostHandler));
postsRouter.post('/:postId/bookmarks', asyncHandler(bookmarkPostHandler));
postsRouter.delete('/:postId/bookmarks', asyncHandler(removeBookmarkHandler));
postsRouter.get('/likes', asyncHandler(listLikesHandler));
postsRouter.get('/bookmarks', asyncHandler(listBookmarksHandler));
