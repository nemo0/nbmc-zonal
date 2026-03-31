import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { NextApiRequest, NextApiResponse } from 'next';

export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN || process.env.AUTH0_ISSUER_BASE_URL,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  secret: process.env.AUTH0_SECRET,
  appBaseUrl: process.env.APP_BASE_URL || process.env.AUTH0_BASE_URL,
  routes: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    callback: '/api/auth/callback',
  },
});

export async function getDataApiAccessToken(
  req: NextApiRequest,
  _res: NextApiResponse
) {
  const session = await auth0.getSession(req);
  const idToken = session?.tokenSet?.idToken;

  if (!idToken) {
    throw new Error('Missing Auth0 ID token in session.');
  }

  return idToken;
}
