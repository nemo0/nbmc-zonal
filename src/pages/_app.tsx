import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { magic } from '@/lib/magic';
import { UserContext } from '@/lib/UserContext';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState() as any;

  const router = useRouter();

  useEffect(() => {
    // Set loading to true to display our loading message within pages/index.js
    setUser({ loading: true });
    // Check if the user is authenticated already
    magic &&
      magic.user.isLoggedIn().then((isLoggedIn) => {
        if (isLoggedIn) {
          // Pull their metadata, update our state, and route to dashboard
          magic &&
            magic.user.getMetadata().then((userData) => setUser(userData));
          // router.push('/dashboard');
        } else {
          // If false, route them to the login page and reset the user state
          // router.push('/login');
          setUser({ user: null });
        }
      });
    // Add an empty dependency array so the useEffect only runs once upon page load
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Component {...pageProps} />
      <ToastContainer />
    </UserContext.Provider>
  );
}

export default MyApp;
