import { NextApiRequest, NextApiResponse } from 'next';

import { requireApprovedAdminApi } from '@/lib/adminAuth';
import { createSupabaseAdminClient } from '@/lib/supabaseServer';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!(await requireApprovedAdminApi(req, res))) {
      return;
    }

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.from('individual').select('*');

    if (error) {
      return res.status(400).json({ error: error.message, success: false });
    }

    return res.status(200).json({ data, success: true });
  } catch {
    return res.status(401).json({ error: 'Unauthorized', success: false });
  }
}

export default handler;
