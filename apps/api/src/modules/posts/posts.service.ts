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
};

type AuthorProfile = {
  id: string;
  full_name: string;
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

async function getAuthorProfile(userId: string): Promise<AuthorProfile> {
  const { data, error } = await supabaseAdminClient
    .from('profiles')
    .select('id, full_name')
    .eq('id', userId)
    .maybeSingle<AuthorProfile>();

  if (error) {
    throw new Error(`Could not load post author profile: ${error.message}`);
  }

  if (!data) {
    throw new Error('Could not load post author profile.');
  }

  return data;
}

async function mapPostsWithAuthor(posts: RawPostRecord[]): Promise<PostRecord[]> {
  if (!posts.length) {
    return [];
  }

  const userIds = [...new Set(posts.map((post) => post.user_id))];
  const { data: profiles, error } = await supabaseAdminClient
    .from('profiles')
    .select('id, full_name')
    .in('id', userIds)
    .returns<AuthorProfile[]>();

  if (error) {
    throw new Error(`Could not load post author profiles: ${error.message}`);
  }

  const profileMap = new Map((profiles ?? []).map((profile) => [profile.id, profile]));

  return posts.map((post) => {
    const author = profileMap.get(post.user_id);
    if (!author) {
      throw new Error(`Could not load post author profile for user ${post.user_id}.`);
    }

    return {
      id: post.id,
      user_id: post.user_id,
      title: post.title,
      body: post.body,
      created_at: post.created_at,
      updated_at: post.updated_at,
      author
    };
  });
}

export async function createPost(userId: string, title: string, body: string): Promise<PostRecord> {
  const { data, error } = await supabaseAdminClient
    .from('posts')
    .insert({ user_id: userId, title, body })
    .select('id, user_id, title, body, created_at, updated_at')
    .single<RawPostRecord>();

  if (error || !data) {
    throw new Error(`Could not create post: ${error?.message ?? 'Unknown error'}`);
  }

  const author = await getAuthorProfile(data.user_id);

  return {
    ...data,
    author
  };
}

export async function updatePost(userId: string, postId: string, title: string, body: string): Promise<PostRecord> {
  const { data, error } = await supabaseAdminClient
    .from('posts')
    .update({ title, body })
    .eq('id', postId)
    .eq('user_id', userId)
    .select('id, user_id, title, body, created_at, updated_at')
    .maybeSingle<RawPostRecord>();

  if (error) {
    throw new Error(`Could not update post: ${error.message}`);
  }

  if (!data) {
    throw new Error('Post not found or unauthorized.');
  }

  const author = await getAuthorProfile(data.user_id);

  return {
    ...data,
    author
  };
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
    .select('id, user_id, title, body, created_at, updated_at')
    .order('created_at', { ascending: false })
    .returns<RawPostRecord[]>();

  if (error) {
    throw new Error(`Could not load posts: ${error.message}`);
  }

  return mapPostsWithAuthor(data ?? []);
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
