import { env } from '../../config/env.js';
import { tokenConfig } from '../../config/constants.js';
import { supabaseAdminClient, supabaseAuthClient } from '../../supabase/client.js';
import { newJti, sha256 } from '../../utils/hash.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from './jwt.js';

export type ProfileUser = {
  id: string;
  email: string;
  role: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthResult = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: ProfileUser;
};

type RegisterResult =
  | AuthResult
  | {
      requiresEmailConfirmation: true;
      email: string;
    };

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isEmailConfirmed(user: { email_confirmed_at?: string | null }): boolean {
  return Boolean(user.email_confirmed_at);
}

async function findUserByEmail(email: string) {
  const normalizedEmail = normalizeEmail(email);
  const perPage = 1000;
  let page = 1;

  while (true) {
    const { data, error } = await supabaseAdminClient.auth.admin.listUsers({ page, perPage });

    if (error) {
      throw new Error(error.message);
    }

    const users = data.users ?? [];
    const matchedUser = users.find((user) => user.email?.toLowerCase() === normalizedEmail);

    if (matchedUser) {
      return matchedUser;
    }

    if (users.length < perPage) {
      return null;
    }

    page += 1;
  }
}

async function upsertProfile(user: { id: string; email?: string | null }, fullName: string): Promise<void> {
  const { error } = await supabaseAdminClient.from('profiles').upsert(
    {
      id: user.id,
      email: user.email ?? '',
      full_name: fullName
    },
    { onConflict: 'id' }
  );

  if (error) {
    throw new Error(`Could not persist profile: ${error.message}`);
  }
}

async function getProfileByUserId(userId: string): Promise<ProfileUser> {
  const { data, error } = await supabaseAdminClient
    .from('profiles')
    .select('id, email, full_name, created_at, updated_at')
    .eq('id', userId)
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? 'Could not load profile');
  }

  return {
    id: data.id,
    email: data.email,
    role: 'authenticated',
    fullName: data.full_name,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  };
}

async function resendSignupConfirmationEmail(email: string): Promise<void> {
  const { error } = await supabaseAuthClient.auth.resend({
    type: 'signup',
    email,
    options: {
      emailRedirectTo: env.APP_URL
    }
  });

  if (error) {
    throw new Error(error.message);
  }
}

async function createWrappedSession(user: { id: string; email?: string | null; role?: string | null }, supabaseRefreshToken: string): Promise<AuthResult> {
  const sid = newJti();
  const refreshToken = await signRefreshToken({ sub: user.id, sid });
  const accessToken = await signAccessToken({
    sub: user.id,
    email: user.email ?? '',
    role: user.role ?? 'authenticated'
  });

  const refreshTokenHash = sha256(refreshToken);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + tokenConfig.refreshTokenTtlMs).toISOString();

  const { error } = await supabaseAdminClient.from('auth_sessions').insert({
    id: sid,
    user_id: user.id,
    refresh_token_hash: refreshTokenHash,
    supabase_refresh_token: supabaseRefreshToken,
    expires_at: expiresAt,
    revoked_at: null
  });

  if (error) {
    throw new Error(`Could not persist session: ${error.message}`);
  }

  const profile = await getProfileByUserId(user.id);

  return {
    accessToken,
    refreshToken,
    expiresIn: Math.floor(tokenConfig.accessTokenTtlMs / 1000),
    user: profile
  };
}

export async function register(email: string, password: string, fullName: string): Promise<RegisterResult> {
  const normalizedEmail = normalizeEmail(email);
  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    if (isEmailConfirmed(existingUser)) {
      throw new Error('Email is already registered and confirmed.');
    }

    await upsertProfile(existingUser, fullName);
    await resendSignupConfirmationEmail(normalizedEmail);

    return {
      requiresEmailConfirmation: true,
      email: normalizedEmail
    };
  }

  const { data, error } = await supabaseAuthClient.auth.signUp({
    email: normalizedEmail,
    password,
    options: {
      data: {
        full_name: fullName
      },
      emailRedirectTo: env.APP_URL
    }
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error('Registration failed: no user returned by Supabase.');
  }

  await upsertProfile(data.user, fullName);

  if (!isEmailConfirmed(data.user) || !data.session?.refresh_token) {
    return {
      requiresEmailConfirmation: true,
      email: normalizedEmail
    };
  }

  return createWrappedSession(data.user, data.session.refresh_token);
}

export async function login(email: string, password: string): Promise<AuthResult> {
  const normalizedEmail = normalizeEmail(email);
  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser && !isEmailConfirmed(existingUser)) {
    throw new Error('Please confirm your email before logging in.');
  }

  const { data, error } = await supabaseAuthClient.auth.signInWithPassword({ email: normalizedEmail, password });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user || !data.session?.refresh_token) {
    throw new Error('Invalid authentication state from Supabase.');
  }

  return createWrappedSession(data.user, data.session.refresh_token);
}

export async function refresh(currentRefreshToken: string): Promise<AuthResult> {
  const { payload } = await verifyRefreshToken(currentRefreshToken);
  const sid = payload.sid;
  const sub = payload.sub;

  if (!sid || !sub || typeof sid !== 'string' || typeof sub !== 'string') {
    throw new Error('Invalid refresh token payload.');
  }

  const { data: existingSession, error: sessionError } = await supabaseAdminClient
    .from('auth_sessions')
    .select('id, user_id, refresh_token_hash, supabase_refresh_token, expires_at, revoked_at')
    .eq('id', sid)
    .eq('user_id', sub)
    .maybeSingle();

  if (sessionError || !existingSession) {
    throw new Error('Refresh session not found.');
  }

  if (existingSession.revoked_at) {
    throw new Error('Session already revoked.');
  }

  if (existingSession.refresh_token_hash !== sha256(currentRefreshToken)) {
    throw new Error('Refresh token mismatch.');
  }

  if (new Date(existingSession.expires_at).getTime() < Date.now()) {
    throw new Error('Refresh session expired.');
  }

  const { data: refreshedSession, error: refreshError } = await supabaseAuthClient.auth.refreshSession({
    refresh_token: existingSession.supabase_refresh_token
  });

  if (refreshError || !refreshedSession.session || !refreshedSession.user) {
    throw new Error(refreshError?.message ?? 'Could not refresh Supabase session.');
  }

  const nextSid = newJti();
  const nextRefreshToken = await signRefreshToken({ sub, sid: nextSid });
  const nextAccessToken = await signAccessToken({
    sub,
    email: refreshedSession.user.email ?? '',
    role: refreshedSession.user.role ?? 'authenticated'
  });

  const nextRefreshTokenHash = sha256(nextRefreshToken);
  const nextExpiresAt = new Date(Date.now() + tokenConfig.refreshTokenTtlMs).toISOString();

  const revokedAt = new Date().toISOString();

  const { error: revokeError } = await supabaseAdminClient
    .from('auth_sessions')
    .update({ revoked_at: revokedAt })
    .eq('id', sid)
    .eq('user_id', sub)
    .is('revoked_at', null);

  if (revokeError) {
    throw new Error(`Could not revoke current refresh session: ${revokeError.message}`);
  }

  const { error: insertError } = await supabaseAdminClient.from('auth_sessions').insert({
    id: nextSid,
    user_id: sub,
    refresh_token_hash: nextRefreshTokenHash,
    supabase_refresh_token: refreshedSession.session.refresh_token,
    expires_at: nextExpiresAt,
    revoked_at: null
  });

  if (insertError) {
    throw new Error(`Could not create next refresh session: ${insertError.message}`);
  }

  const profile = await getProfileByUserId(sub);

  return {
    accessToken: nextAccessToken,
    refreshToken: nextRefreshToken,
    expiresIn: Math.floor(tokenConfig.accessTokenTtlMs / 1000),
    user: profile
  };
}

export async function logout(currentRefreshToken: string): Promise<void> {
  const { payload } = await verifyRefreshToken(currentRefreshToken);
  const sid = payload.sid;
  const sub = payload.sub;

  if (!sid || !sub || typeof sid !== 'string' || typeof sub !== 'string') {
    return;
  }

  await supabaseAdminClient
    .from('auth_sessions')
    .update({ revoked_at: new Date().toISOString() })
    .eq('id', sid)
    .eq('user_id', sub)
    .is('revoked_at', null);
}

export async function getCurrentUser(userId: string): Promise<ProfileUser> {
  return getProfileByUserId(userId);
}

export async function getSessionRemainingSeconds(currentRefreshToken: string, userId: string): Promise<number> {
  const { payload } = await verifyRefreshToken(currentRefreshToken);
  const sid = payload.sid;
  const sub = payload.sub;

  if (!sid || !sub || typeof sid !== 'string' || typeof sub !== 'string') {
    throw new Error('Invalid refresh token payload.');
  }

  if (sub !== userId) {
    throw new Error('Unauthorized session access.');
  }

  const { data: existingSession, error } = await supabaseAdminClient
    .from('auth_sessions')
    .select('expires_at, revoked_at')
    .eq('id', sid)
    .eq('user_id', sub)
    .is('revoked_at', null)
    .maybeSingle();

  if (error || !existingSession) {
    throw new Error('Refresh session not found.');
  }

  const remainingMs = new Date(existingSession.expires_at).getTime() - Date.now();

  if (remainingMs <= 0) {
    throw new Error('Refresh session expired.');
  }

  return Math.floor(remainingMs / 1000);
}

export async function checkEmailExists(email: string): Promise<{ email: string; exists: boolean }> {
  const normalizedEmail = normalizeEmail(email);
  const user = await findUserByEmail(normalizedEmail);

  return {
    email: normalizedEmail,
    exists: Boolean(user && isEmailConfirmed(user))
  };
}

export async function resendEmailConfirmation(email: string): Promise<{ email: string; resent: boolean }> {
  const normalizedEmail = normalizeEmail(email);
  const existingUser = await findUserByEmail(normalizedEmail);

  if (!existingUser || isEmailConfirmed(existingUser)) {
    return {
      email: normalizedEmail,
      resent: false
    };
  }

  await resendSignupConfirmationEmail(normalizedEmail);

  return {
    email: normalizedEmail,
    resent: true
  };
}

export async function verifyEmailConfirmation(email: string, token: string): Promise<AuthResult> {
  const normalizedEmail = normalizeEmail(email);
  const { data, error } = await supabaseAuthClient.auth.verifyOtp({
    email: normalizedEmail,
    token,
    type: 'signup'
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user || !data.session?.refresh_token) {
    throw new Error('Invalid authentication state from Supabase.');
  }

  await upsertProfile(data.user, data.user.user_metadata?.full_name ?? '');

  return createWrappedSession(data.user, data.session.refresh_token);
}

export function refreshCookieOptions() {
  return {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
    domain: env.COOKIE_DOMAIN,
    maxAge: tokenConfig.refreshTokenTtlMs
  };
}
