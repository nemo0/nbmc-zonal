import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabaseUrl = process.env.SUPABASE_DB_URL || '';
const supabaseKey = process.env.SUPABASE_DB_PROJECT_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, error } = await supabase.from('individual').select('*');

  if (error) {
    return res.status(400).json({ error: error.message, success: false });
  }

  return res.status(200).json({ data, success: true });
}
