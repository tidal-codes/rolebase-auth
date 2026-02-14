import { Router } from 'express';
import { asyncHandler } from '../../middleware/async-handler.js';
import { requireAuth } from '../../middleware/auth.js';
import {
  bookmarkPostHandler,
  createPostHandler,
  likePostHandler,
  listBookmarksHandler,
  listLikesHandler,
  listPostsHandler
} from './posts.controller.js';

export const postsRouter = Router();

postsRouter.use(requireAuth);

postsRouter.get('/', asyncHandler(listPostsHandler));
postsRouter.post('/', asyncHandler(createPostHandler));
postsRouter.post('/:postId/likes', asyncHandler(likePostHandler));
postsRouter.post('/:postId/bookmarks', asyncHandler(bookmarkPostHandler));
postsRouter.get('/likes', asyncHandler(listLikesHandler));
postsRouter.get('/bookmarks', asyncHandler(listBookmarksHandler));
