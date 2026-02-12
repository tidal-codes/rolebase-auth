import { env } from '../../config/env.js';
import { tokenConfig } from '../../config/constants.js';
import { supabaseAdminClient, supabaseAuthClient } from '../../supabase/client.js';
import { newJti, sha256 } from '../../utils/hash.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from './jwt.js';

export type AuthResult = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    role: string;
  };
};

function mapUser(user: { id: string; email?: string | null; role?: string | null }) {
  return {
    id: user.id,
    email: user.email ?? '',
    role: user.role ?? 'authenticated'
  };
}

async function createWrappedSession(user: { id: string; email?: string | null; role?: string | null }, supabaseRefreshToken: string): Promise<AuthResult> {
  const mappedUser = mapUser(user);
  const sid = newJti();
  const refreshToken = await signRefreshToken({ sub: mappedUser.id, sid });
  const accessToken = await signAccessToken({
    sub: mappedUser.id,
    email: mappedUser.email,
    role: mappedUser.role
  });

  const refreshTokenHash = sha256(refreshToken);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + tokenConfig.refreshTokenTtlMs).toISOString();

  const { error } = await supabaseAdminClient.from('auth_sessions').insert({
    id: sid,
    user_id: mappedUser.id,
    refresh_token_hash: refreshTokenHash,
    supabase_refresh_token: supabaseRefreshToken,
    expires_at: expiresAt,
    revoked_at: null
  });

  if (error) {
    throw new Error(`Could not persist session: ${error.message}`);
  }

  return {
    accessToken,
    refreshToken,
    expiresIn: Math.floor(tokenConfig.accessTokenTtlMs / 1000),
    user: mappedUser
  };
}

export async function register(email: string, password: string, fullName: string): Promise<AuthResult> {
  const { data, error } = await supabaseAuthClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName
      }
    }
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user || !data.session?.refresh_token) {
    throw new Error('Registration succeeded but no active session returned. Check Supabase email confirmation settings.');
  }

  return createWrappedSession(data.user, data.session.refresh_token);
}

export async function login(email: string, password: string): Promise<AuthResult> {
  const { data, error } = await supabaseAuthClient.auth.signInWithPassword({ email, password });

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

  const { error: rotateError } = await supabaseAdminClient.from('auth_sessions').upsert([
    {
      id: sid,
      user_id: sub,
      revoked_at: new Date().toISOString()
    },
    {
      id: nextSid,
      user_id: sub,
      refresh_token_hash: nextRefreshTokenHash,
      supabase_refresh_token: refreshedSession.session.refresh_token,
      expires_at: nextExpiresAt,
      revoked_at: null
    }
  ]);

  if (rotateError) {
    throw new Error(`Could not rotate refresh session: ${rotateError.message}`);
  }

  return {
    accessToken: nextAccessToken,
    refreshToken: nextRefreshToken,
    expiresIn: Math.floor(tokenConfig.accessTokenTtlMs / 1000),
    user: mapUser(refreshedSession.user)
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

export async function getCurrentUser(userId: string) {
  const { data, error } = await supabaseAdminClient.auth.admin.getUserById(userId);

  if (error || !data.user) {
    throw new Error(error?.message ?? 'Could not load user');
  }

  return mapUser(data.user);
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
