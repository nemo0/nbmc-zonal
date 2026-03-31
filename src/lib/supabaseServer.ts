import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

function decodeJwtPayload(token: string): { role?: string } | null {
  try {
    const payloadBase64 = token.split('.')[1];

    if (!payloadBase64) return null;

    const payloadJson = Buffer.from(payloadBase64, 'base64url').toString(
      'utf8'
    );
    return JSON.parse(payloadJson);
  } catch {
    return null;
  }
}

function assertRlsSafeApiKey(apiKey: string) {
  if (!apiKey) {
    throw new Error('Missing Supabase API key for Data API client.');
  }

  if (apiKey.startsWith('sb_secret_')) {
    throw new Error('Use SUPABASE_ANON_KEY for RLS-compliant Data API access.');
  }

  const payload = decodeJwtPayload(apiKey);

  if (payload?.role === 'service_role') {
    throw new Error(
      'Service role key is not allowed for RLS-compliant Data API access.'
    );
  }
}

export function createSupabaseDataClient(accessToken?: string) {
  if (!supabaseUrl) {
    throw new Error('Missing SUPABASE_URL.');
  }

  assertRlsSafeApiKey(supabaseAnonKey);

  const headers: Record<string, string> = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : {};

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
    global: {
      headers,
    },
  });
}
