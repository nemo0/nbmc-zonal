import { NextApiRequest, NextApiResponse } from 'next';

import { clearAuthCookies } from '@/lib/adminAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res
      .status(405)
      .json({ success: false, error: 'Method not allowed' });
  }

  clearAuthCookies(res);

  if (req.method === 'GET') {
    return res.redirect('/login');
  }

  return res.status(200).json({ success: true });
}
