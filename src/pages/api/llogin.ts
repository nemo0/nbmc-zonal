import { Magic } from '@magic-sdk/admin';
import { NextApiRequest, NextApiResponse } from 'next';

import { magicSecretKey } from '@/constant/env';

// Create an instance of magic admin using our secret key (not our publishable key)
const mAdmin = new Magic(magicSecretKey);

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Grab the DID token from our headers and parse it
    const didToken = mAdmin.utils.parseAuthorizationHeader(
      req.headers.authorization as string
    );
    // Validate the token and send back a successful response
    await mAdmin.token.validate(didToken);
    res.status(200).json({ authenticated: true });
  } catch (error) {
    res.status(500).json({ error: error || 'Something went wrong' });
  }
}
