import type { Session, User } from '@supabase/supabase-js';
import type { IncomingHttpHeaders, ServerResponse } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';

import {
  createSupabaseAdminClient,
  createSupabasePublicClient,
} from '@/lib/supabaseServer';

type RequestLike = {
  headers: IncomingHttpHeaders;
};
type ResponseLike = Pick<ServerResponse, 'setHeader' | 'getHeader'>;

export const ADMIN_ACCESS_TOKEN_COOKIE = 'nbmc_admin_access_token';
export const ADMIN_REFRESH_TOKEN_COOKIE = 'nbmc_admin_refresh_token';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

type AuthResult =
  | { ok: true; user: AdminUser }
  | { ok: false; status: 401 | 403 };

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function parseCookieHeader(cookieHeader?: string) {
  if (!cookieHeader) {
    return {} as Record<string, string>;
  }

  return cookieHeader.split(';').reduce((cookies, rawCookie) => {
    const [name, ...valueParts] = rawCookie.trim().split('=');

    if (!name || valueParts.length === 0) {
      return cookies;
    }

    cookies[name] = decodeURIComponent(valueParts.join('='));
    return cookies;
  }, {} as Record<string, string>);
}

function appendSetCookie(res: ResponseLike, cookies: string[]) {
  const existing = res.getHeader('Set-Cookie');
  const cookieList = Array.isArray(existing)
    ? existing
    : typeof existing === 'string'
    ? [existing]
    : [];

  res.setHeader('Set-Cookie', [...cookieList, ...cookies]);
}

function makeCookie(name: string, value: string, maxAge?: number) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
  ];

  if (process.env.NODE_ENV === 'production') {
    parts.push('Secure');
  }

  if (typeof maxAge === 'number') {
    parts.push(`Max-Age=${maxAge}`);
  }

  return parts.join('; ');
}

function clearCookie(name: string) {
  const parts = [
    `${name}=`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Max-Age=0',
    'Expires=Thu, 01 Jan 1970 00:00:00 GMT',
  ];

  if (process.env.NODE_ENV === 'production') {
    parts.push('Secure');
  }

  return parts.join('; ');
}

export function setAuthCookies(
  res: ResponseLike,
  accessToken: string,
  refreshToken: string
) {
  appendSetCookie(res, [
    makeCookie(ADMIN_ACCESS_TOKEN_COOKIE, accessToken, 60 * 60),
    makeCookie(ADMIN_REFRESH_TOKEN_COOKIE, refreshToken, 60 * 60 * 24 * 30),
  ]);
}

export function clearAuthCookies(res: ResponseLike) {
  appendSetCookie(res, [
    clearCookie(ADMIN_ACCESS_TOKEN_COOKIE),
    clearCookie(ADMIN_REFRESH_TOKEN_COOKIE),
  ]);
}

function toAdminUser(user: User): AdminUser {
  const metadata = user.user_metadata || {};
  const candidateName = metadata.name || metadata.full_name || user.email || '';

  return {
    id: user.id,
    email: user.email || '',
    name: String(candidateName),
  };
}

export async function isApprovedAdminEmail(email: string) {
  const normalizedEmail = normalizeEmail(email);
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from('approved_admin_users')
    .select('email')
    .eq('email', normalizedEmail)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return Boolean(data);
}

async function getUserFromAccessToken(accessToken: string) {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error || !data.user) {
    return null;
  }

  return data.user;
}

async function refreshUserSession(refreshToken: string) {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase.auth.refreshSession({
    refresh_token: refreshToken,
  });

  if (error || !data.session || !data.user) {
    return null;
  }

  return data;
}

async function getUserFromCookies(req: RequestLike, res: ResponseLike) {
  const cookies = parseCookieHeader(req.headers.cookie);
  const accessToken = cookies[ADMIN_ACCESS_TOKEN_COOKIE];
  const refreshToken = cookies[ADMIN_REFRESH_TOKEN_COOKIE];

  if (!accessToken && !refreshToken) {
    return null;
  }

  if (accessToken) {
    const user = await getUserFromAccessToken(accessToken);

    if (user) {
      return user;
    }
  }

  if (!refreshToken) {
    clearAuthCookies(res);
    return null;
  }

  const refreshedSession = await refreshUserSession(refreshToken);

  if (!refreshedSession?.session || !refreshedSession.user) {
    clearAuthCookies(res);
    return null;
  }

  setAuthCookies(
    res,
    refreshedSession.session.access_token,
    refreshedSession.session.refresh_token
  );

  return refreshedSession.user;
}

export async function getApprovedAdminFromRequest(
  req: RequestLike,
  res: ResponseLike
): Promise<AuthResult> {
  const user = await getUserFromCookies(req, res);

  if (!user?.email) {
    return { ok: false, status: 401 };
  }

  const approved = await isApprovedAdminEmail(user.email);

  if (!approved) {
    clearAuthCookies(res);
    return { ok: false, status: 403 };
  }

  return { ok: true, user: toAdminUser(user) };
}

export async function requireApprovedAdminApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const auth = await getApprovedAdminFromRequest(req, res);

  if (auth.ok) {
    return auth.user;
  }

  const error = auth.status === 401 ? 'Unauthorized' : 'Forbidden';
  res.status(auth.status).json({ error, success: false });
  return null;
}

export function getAdminUserFromSession(session: Session) {
  return toAdminUser(session.user);
}
