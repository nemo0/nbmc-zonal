import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.SUPABASE_DB_URL || process.env.SUPABASE_URL || '';
const supabaseKey =
  process.env.SUPABASE_DB_PROJECT_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  '';

export const supabaseServer = createClient(supabaseUrl, supabaseKey);
