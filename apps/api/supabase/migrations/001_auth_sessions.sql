create extension if not exists pgcrypto;

create table if not exists public.auth_sessions (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  refresh_token_hash text not null,
  supabase_refresh_token text not null,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_auth_sessions_user_id on public.auth_sessions(user_id);
create index if not exists idx_auth_sessions_expires_at on public.auth_sessions(expires_at);

alter table public.auth_sessions enable row level security;

create policy "service_role_full_access_auth_sessions"
  on public.auth_sessions
  as permissive
  for all
  to service_role
  using (true)
  with check (true);
