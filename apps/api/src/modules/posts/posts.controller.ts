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
import { createPostSchema, postIdParamSchema, updatePostSchema } from './posts.schema.js';

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

export async function listPostsHandler(_req: Request, res: Response) {
  const posts = await listPosts();
  res.status(200).json({ success: true, data: posts });
}

export async function likePostHandler(req: Request, res: Response) {
  const userId = getAuthenticatedUserId(req);
  const { postId } = postIdParamSchema.parse(req.params);
  const like = await likePost(userId, postId);

  res.status(201).json({ success: true, data: like });
}

export async function unlikePostHandler(req: Request, res: Response) {
  const userId = getAuthenticatedUserId(req);
  const { postId } = postIdParamSchema.parse(req.params);
  await unlikePost(userId, postId);

  res.status(200).json({ success: true, data: { removed: true } });
}

export async function bookmarkPostHandler(req: Request, res: Response) {
  const userId = getAuthenticatedUserId(req);
  const { postId } = postIdParamSchema.parse(req.params);
  const bookmark = await bookmarkPost(userId, postId);

  res.status(201).json({ success: true, data: bookmark });
}

export async function removeBookmarkHandler(req: Request, res: Response) {
  const userId = getAuthenticatedUserId(req);
  const { postId } = postIdParamSchema.parse(req.params);
  await removeBookmark(userId, postId);

  res.status(200).json({ success: true, data: { removed: true } });
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
