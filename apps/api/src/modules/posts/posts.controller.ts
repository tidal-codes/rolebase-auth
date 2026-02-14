import type { Request, Response } from 'express';
import { bookmarkPost, createPost, likePost, listBookmarks, listLikes, listPosts } from './posts.service.js';
import { createPostSchema, postIdParamSchema } from './posts.schema.js';

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

export async function bookmarkPostHandler(req: Request, res: Response) {
  const userId = getAuthenticatedUserId(req);
  const { postId } = postIdParamSchema.parse(req.params);
  const bookmark = await bookmarkPost(userId, postId);

  res.status(201).json({ success: true, data: bookmark });
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
