import { supabaseAdminClient } from '../../supabase/client.js';

export type PostRecord = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  created_at: string;
};

export type LikeRecord = {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
};

export type BookmarkRecord = {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
};

export async function createPost(userId: string, title: string, body: string): Promise<PostRecord> {
  const { data, error } = await supabaseAdminClient
    .from('posts')
    .insert({ user_id: userId, title, body })
    .select('id, user_id, title, body, created_at')
    .single();

  if (error || !data) {
    throw new Error(`Could not create post: ${error?.message ?? 'Unknown error'}`);
  }

  return data;
}

export async function listPosts(): Promise<PostRecord[]> {
  const { data, error } = await supabaseAdminClient
    .from('posts')
    .select('id, user_id, title, body, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Could not load posts: ${error.message}`);
  }

  return data ?? [];
}

export async function likePost(userId: string, postId: string): Promise<LikeRecord> {
  const { data, error } = await supabaseAdminClient
    .from('likes')
    .upsert({ user_id: userId, post_id: postId }, { onConflict: 'user_id,post_id' })
    .select('id, user_id, post_id, created_at')
    .single();

  if (error || !data) {
    throw new Error(`Could not like post: ${error?.message ?? 'Unknown error'}`);
  }

  return data;
}

export async function bookmarkPost(userId: string, postId: string): Promise<BookmarkRecord> {
  const { data, error } = await supabaseAdminClient
    .from('bookmarks')
    .upsert({ user_id: userId, post_id: postId }, { onConflict: 'user_id,post_id' })
    .select('id, user_id, post_id, created_at')
    .single();

  if (error || !data) {
    throw new Error(`Could not bookmark post: ${error?.message ?? 'Unknown error'}`);
  }

  return data;
}

export async function listLikes(userId: string): Promise<LikeRecord[]> {
  const { data, error } = await supabaseAdminClient
    .from('likes')
    .select('id, user_id, post_id, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Could not load likes: ${error.message}`);
  }

  return data ?? [];
}

export async function listBookmarks(userId: string): Promise<BookmarkRecord[]> {
  const { data, error } = await supabaseAdminClient
    .from('bookmarks')
    .select('id, user_id, post_id, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Could not load bookmarks: ${error.message}`);
  }

  return data ?? [];
}
