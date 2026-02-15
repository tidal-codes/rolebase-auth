-- This migration is intentionally idempotent and starts by removing old policies/constraints
-- before creating the new ones, so re-running does not fail.

-- Ensure all auth users have profiles so FK from posts -> profiles can be added safely.
insert into public.profiles (id, email, full_name)
select
  u.id,
  coalesce(u.email, ''),
  coalesce(u.raw_user_meta_data ->> 'full_name', '')
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null;

-- Replace posts FK to target profiles (needed for direct relational joins in Supabase schema cache).
alter table public.posts
  drop constraint if exists posts_user_id_fkey;

alter table public.posts
  add constraint posts_user_id_fkey
  foreign key (user_id)
  references public.profiles(id)
  on delete cascade;

-- Ensure updated_at is maintained for posts updates.
drop trigger if exists trg_posts_updated_at on public.posts;

create trigger trg_posts_updated_at
before update on public.posts
for each row
execute procedure public.set_updated_at();

-- Drop old policies first to avoid conflicts.
drop policy if exists "Authenticated users can read posts" on public.posts;
drop policy if exists "Authenticated users can create their posts" on public.posts;
drop policy if exists "Authenticated users can manage likes" on public.likes;
drop policy if exists "Authenticated users can manage bookmarks" on public.bookmarks;

drop policy if exists "Authenticated users can update their posts" on public.posts;
drop policy if exists "Authenticated users can delete their posts" on public.posts;
drop policy if exists "Authenticated users can read likes" on public.likes;
drop policy if exists "Authenticated users can create likes" on public.likes;
drop policy if exists "Authenticated users can delete likes" on public.likes;
drop policy if exists "Authenticated users can read bookmarks" on public.bookmarks;
drop policy if exists "Authenticated users can create bookmarks" on public.bookmarks;
drop policy if exists "Authenticated users can delete bookmarks" on public.bookmarks;

-- Recreate explicit, operation-specific policies.
create policy "Authenticated users can read posts"
  on public.posts
  for select
  to authenticated
  using (true);

create policy "Authenticated users can create their posts"
  on public.posts
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Authenticated users can update their posts"
  on public.posts
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Authenticated users can delete their posts"
  on public.posts
  for delete
  to authenticated
  using (auth.uid() = user_id);

create policy "Authenticated users can read likes"
  on public.likes
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Authenticated users can create likes"
  on public.likes
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Authenticated users can delete likes"
  on public.likes
  for delete
  to authenticated
  using (auth.uid() = user_id);

create policy "Authenticated users can read bookmarks"
  on public.bookmarks
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Authenticated users can create bookmarks"
  on public.bookmarks
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Authenticated users can delete bookmarks"
  on public.bookmarks
  for delete
  to authenticated
  using (auth.uid() = user_id);
