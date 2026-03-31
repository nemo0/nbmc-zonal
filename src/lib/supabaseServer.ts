import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

function assertApiKey(apiKey: string, keyName: string) {
  if (!apiKey) {
    throw new Error(`Missing ${keyName}.`);
  }
}

function createSupabaseClient(apiKey: string) {
  if (!supabaseUrl) {
    throw new Error('Missing SUPABASE_URL.');
  }

  return createClient(supabaseUrl, apiKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}

export function createSupabasePublicClient() {
  assertApiKey(supabaseAnonKey, 'SUPABASE_ANON_KEY');
  return createSupabaseClient(supabaseAnonKey);
}

export function createSupabaseAdminClient() {
  assertApiKey(supabaseServiceRoleKey, 'SUPABASE_SERVICE_ROLE_KEY');
  return createSupabaseClient(supabaseServiceRoleKey);
}
