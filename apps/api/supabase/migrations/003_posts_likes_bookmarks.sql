create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  post_id uuid not null references public.posts(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, post_id)
);

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  post_id uuid not null references public.posts(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, post_id)
);

create index if not exists posts_user_id_idx on public.posts (user_id);
create index if not exists likes_user_id_idx on public.likes (user_id);
create index if not exists likes_post_id_idx on public.likes (post_id);
create index if not exists bookmarks_user_id_idx on public.bookmarks (user_id);
create index if not exists bookmarks_post_id_idx on public.bookmarks (post_id);

alter table public.posts enable row level security;
alter table public.likes enable row level security;
alter table public.bookmarks enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='posts' and policyname='Authenticated users can read posts'
  ) then
    create policy "Authenticated users can read posts"
      on public.posts
      for select
      to authenticated
      using (true);
  end if;

  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='posts' and policyname='Authenticated users can create their posts'
  ) then
    create policy "Authenticated users can create their posts"
      on public.posts
      for insert
      to authenticated
      with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='likes' and policyname='Authenticated users can manage likes'
  ) then
    create policy "Authenticated users can manage likes"
      on public.likes
      for all
      to authenticated
      using (auth.uid() = user_id)
      with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='bookmarks' and policyname='Authenticated users can manage bookmarks'
  ) then
    create policy "Authenticated users can manage bookmarks"
      on public.bookmarks
      for all
      to authenticated
      using (auth.uid() = user_id)
      with check (auth.uid() = user_id);
  end if;
end $$;
