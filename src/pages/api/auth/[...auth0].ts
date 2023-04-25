import { handleAuth } from '@auth0/nextjs-auth0';

const baseUrl = process.env.AUTH0_BASE_URL;

export default handleAuth();
