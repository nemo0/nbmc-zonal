import { NextApiRequest, NextApiResponse } from 'next';

import {
  getAdminUserFromSession,
  isApprovedAdminEmail,
  setAuthCookies,
} from '@/lib/adminAuth';
import { createSupabasePublicClient } from '@/lib/supabaseServer';

function badRequest(res: NextApiResponse, message: string) {
  return res.status(400).json({ success: false, error: message });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ success: false, error: 'Method not allowed' });
  }

  try {
    const email = String(req.body?.email || '')
      .trim()
      .toLowerCase();
    const password = String(req.body?.password || '');

    if (!email || !password) {
      return badRequest(res, 'Email and password are required');
    }

    const isApproved = await isApprovedAdminEmail(email);

    if (!isApproved) {
      return res.status(403).json({
        success: false,
        error: 'This account is not approved for admin access',
      });
    }

    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    setAuthCookies(res, data.session.access_token, data.session.refresh_token);

    return res.status(200).json({
      success: true,
      user: getAdminUserFromSession(data.session),
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Unable to sign in',
    });
  }
}
