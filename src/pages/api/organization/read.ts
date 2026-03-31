import { NextApiRequest, NextApiResponse } from 'next';
import { auth0 } from '@/lib/auth0';
import { createSupabaseAdminClient } from '@/lib/supabaseServer';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.from('organization').select('*');

    if (error) {
      return res.status(400).json({ error: error.message, success: false });
    }

    return res.status(200).json({ data, success: true });
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized', success: false });
  }
}

export default auth0.withApiAuthRequired(handler);
