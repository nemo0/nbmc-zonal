import { NextApiRequest, NextApiResponse } from 'next';

import {
  getAdminUserFromSession,
  isApprovedAdminEmail,
  setAuthCookies,
} from '@/lib/adminAuth';
import {
  createSupabaseAdminClient,
  createSupabasePublicClient,
} from '@/lib/supabaseServer';

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
    const name = String(req.body?.name || '').trim();

    if (!email || !password) {
      return badRequest(res, 'Email and password are required');
    }

    if (password.length < 8) {
      return badRequest(res, 'Password must be at least 8 characters');
    }

    const isApproved = await isApprovedAdminEmail(email);

    if (!isApproved) {
      return res.status(403).json({
        success: false,
        error: 'This account is not approved for admin access',
      });
    }

    const admin = createSupabaseAdminClient();
    const { error: createError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: name ? { name } : undefined,
    });

    if (createError) {
      return res.status(409).json({
        success: false,
        error: createError.message,
      });
    }

    const supabase = createSupabasePublicClient();
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError || !loginData.session) {
      return res.status(500).json({
        success: false,
        error: 'User created but sign in failed',
      });
    }

    setAuthCookies(
      res,
      loginData.session.access_token,
      loginData.session.refresh_token
    );

    return res.status(200).json({
      success: true,
      user: getAdminUserFromSession(loginData.session),
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Unable to create account',
    });
  }
}
