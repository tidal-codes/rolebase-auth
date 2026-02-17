import type { Request, Response } from 'express';
import {
  bookmarkPost,
  createPost,
  deletePost,
  likePost,
  listBookmarks,
  listLikes,
  listPosts,
  removeBookmark,
  unlikePost,
  updatePost
} from './posts.service.js';
import {
  createPostSchema,
  postIdParamSchema,
  toggleBookmarkSchema,
  toggleLikeSchema,
  updatePostSchema
} from './posts.schema.js';

function getAuthenticatedUserId(req: Request): string {
  if (!req.auth?.userId) {
    throw new Error('Unauthorized.');
  }

  return req.auth.userId;
}

export async function createPostHandler(req: Request, res: Response) {
  const userId = getAuthenticatedUserId(req);
  const payload = createPostSchema.parse(req.body);
  const post = await createPost(userId, payload.title, payload.body);

  res.status(201).json({ success: true, data: post });
}

export async function updatePostHandler(req: Request, res: Response) {
  const userId = getAuthenticatedUserId(req);
  const { postId } = postIdParamSchema.parse(req.params);
  const payload = updatePostSchema.parse(req.body);
  const post = await updatePost(userId, postId, payload.title, payload.body);

  res.status(200).json({ success: true, data: post });
}

export async function deletePostHandler(req: Request, res: Response) {
  const userId = getAuthenticatedUserId(req);
  const { postId } = postIdParamSchema.parse(req.params);
  await deletePost(userId, postId);

  res.status(200).json({ success: true, data: { deleted: true } });
}

export async function listPostsHandler(req: Request, res: Response) {
  const userId = getAuthenticatedUserId(req);
  const posts = await listPosts(userId);
  res.status(200).json({ success: true, data: posts });
}

export async function likePostHandler(req: Request, res: Response) {
  const userId = getAuthenticatedUserId(req);
  const { postId } = postIdParamSchema.parse(req.params);
  const payload = toggleLikeSchema.parse(req.body);

  if (payload.liked) {
    const like = await likePost(userId, postId);
    res.status(200).json({ success: true, data: { liked: true, record: like } });
    return;
  }

  await unlikePost(userId, postId);
  res.status(200).json({ success: true, data: { liked: false } });
}

export async function bookmarkPostHandler(req: Request, res: Response) {
  const userId = getAuthenticatedUserId(req);
  const { postId } = postIdParamSchema.parse(req.params);
  const payload = toggleBookmarkSchema.parse(req.body);

  if (payload.saved) {
    const bookmark = await bookmarkPost(userId, postId);
    res.status(200).json({ success: true, data: { saved: true, record: bookmark } });
    return;
  }

  await removeBookmark(userId, postId);
  res.status(200).json({ success: true, data: { saved: false } });
}

export async function listLikesHandler(req: Request, res: Response) {
  const userId = getAuthenticatedUserId(req);
  const likes = await listLikes(userId);

  res.status(200).json({ success: true, data: likes });
}

export async function listBookmarksHandler(req: Request, res: Response) {
  const userId = getAuthenticatedUserId(req);
  const bookmarks = await listBookmarks(userId);

  res.status(200).json({ success: true, data: bookmarks });
}
