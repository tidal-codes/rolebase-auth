import { supabaseAdminClient } from '../../supabase/client.js';

export type PostRecord = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  author: {
    id: string;
    full_name: string;
  };
};

type RawPostRecord = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  profiles: {
    id: string;
    full_name: string;
  } | null;
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

function mapPostRecord(record: RawPostRecord): PostRecord {
  if (!record.profiles) {
    throw new Error('Could not load post author profile.');
  }

  return {
    id: record.id,
    user_id: record.user_id,
    title: record.title,
    body: record.body,
    created_at: record.created_at,
    updated_at: record.updated_at,
    author: {
      id: record.profiles.id,
      full_name: record.profiles.full_name
    }
  };
}

export async function createPost(userId: string, title: string, body: string): Promise<PostRecord> {
  const { data, error } = await supabaseAdminClient
    .from('posts')
    .insert({ user_id: userId, title, body })
    .select('id, user_id, title, body, created_at, updated_at, profiles!posts_user_id_fkey(id, full_name)')
    .single<RawPostRecord>();

  if (error || !data) {
    throw new Error(`Could not create post: ${error?.message ?? 'Unknown error'}`);
  }

  return mapPostRecord(data);
}

export async function updatePost(userId: string, postId: string, title: string, body: string): Promise<PostRecord> {
  const { data, error } = await supabaseAdminClient
    .from('posts')
    .update({ title, body })
    .eq('id', postId)
    .eq('user_id', userId)
    .select('id, user_id, title, body, created_at, updated_at, profiles!posts_user_id_fkey(id, full_name)')
    .maybeSingle<RawPostRecord>();

  if (error) {
    throw new Error(`Could not update post: ${error.message}`);
  }

  if (!data) {
    throw new Error('Post not found or unauthorized.');
  }

  return mapPostRecord(data);
}

export async function deletePost(userId: string, postId: string): Promise<void> {
  const { data, error } = await supabaseAdminClient.from('posts').delete().eq('id', postId).eq('user_id', userId).select('id').maybeSingle();

  if (error) {
    throw new Error(`Could not delete post: ${error.message}`);
  }

  if (!data) {
    throw new Error('Post not found or unauthorized.');
  }
}

export async function listPosts(): Promise<PostRecord[]> {
  const { data, error } = await supabaseAdminClient
    .from('posts')
    .select('id, user_id, title, body, created_at, updated_at, profiles!posts_user_id_fkey(id, full_name)')
    .order('created_at', { ascending: false })
    .returns<RawPostRecord[]>();

  if (error) {
    throw new Error(`Could not load posts: ${error.message}`);
  }

  return (data ?? []).map(mapPostRecord);
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

export async function unlikePost(userId: string, postId: string): Promise<void> {
  const { error } = await supabaseAdminClient.from('likes').delete().eq('user_id', userId).eq('post_id', postId);

  if (error) {
    throw new Error(`Could not remove like: ${error.message}`);
  }
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

export async function removeBookmark(userId: string, postId: string): Promise<void> {
  const { error } = await supabaseAdminClient.from('bookmarks').delete().eq('user_id', userId).eq('post_id', postId);

  if (error) {
    throw new Error(`Could not remove bookmark: ${error.message}`);
  }
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
