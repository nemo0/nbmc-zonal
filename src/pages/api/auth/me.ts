import { NextApiRequest, NextApiResponse } from 'next';

import { getApprovedAdminFromRequest } from '@/lib/adminAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res
      .status(405)
      .json({ success: false, error: 'Method not allowed' });
  }

  try {
    const auth = await getApprovedAdminFromRequest(req, res);

    if (!auth.ok) {
      const error = auth.status === 401 ? 'Unauthorized' : 'Forbidden';
      return res.status(auth.status).json({ success: false, error });
    }

    return res.status(200).json({ success: true, user: auth.user });
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch current user',
    });
  }
}
