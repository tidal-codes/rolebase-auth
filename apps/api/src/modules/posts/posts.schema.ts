import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().trim().min(1).max(200),
  body: z.string().trim().min(1).max(10000)
});

export const updatePostSchema = z.object({
  title: z.string().trim().min(1).max(200),
  body: z.string().trim().min(1).max(10000)
});

export const postIdParamSchema = z.object({
  postId: z.string().uuid()
});
