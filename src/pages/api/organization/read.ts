import { NextApiRequest, NextApiResponse } from 'next';
import { auth0, getDataApiAccessToken } from '@/lib/auth0';
import { createSupabaseDataClient } from '@/lib/supabaseServer';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const accessToken = await getDataApiAccessToken(req, res);
    const supabase = createSupabaseDataClient(accessToken);
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
