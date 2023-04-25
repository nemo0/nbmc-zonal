import { UserProvider } from '@auth0/nextjs-auth0/client';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState() as any;

  const router = useRouter();

  return (
    <UserProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </UserProvider>
  );
}

export default MyApp;
