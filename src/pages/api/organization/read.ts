import { NextApiRequest, NextApiResponse } from 'next';
import { auth0 } from '@/lib/auth0';
import { supabaseServer } from '@/lib/supabaseServer';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabaseServer.from('organization').select('*');

  if (error) {
    return res.status(400).json({ error: error.message, success: false });
  }

  return res.status(200).json({ data, success: true });
}

export default auth0.withApiAuthRequired(handler);
