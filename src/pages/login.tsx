import { useRouter } from 'next/router';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';

import { magic } from '@/lib/magic';
import { UserContext } from '@/lib/UserContext';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState('');

  const router = useRouter();

  useEffect(() => {
    // Check for an issuer on our user object. If it exists, route them to the dashboard.
    user?.issuer && router.push('/dashboard');
  }, [user]);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    // Log in using our email with Magic and store the returned DID token in a variable
    try {
      const didToken =
        magic &&
        (await magic?.auth.loginWithMagicLink({
          email,
        }));

      // Send this token to our validation endpoint
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${didToken}`,
        },
      });

      // If successful, update our user state with their metadata and route to the dashboard
      if (res.ok) {
        const userMetadata = magic && (await magic.user.getMetadata());
        setUser(userMetadata);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main className='layout flex h-[85vh] flex-col justify-center'>
        <h4 className='my-6 text-center'>
          <UnderlineLink href='/login'>Login</UnderlineLink>
        </h4>
        <div>
          <form onSubmit={handleLogin} className='mx-auto w-full md:w-7/12'>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='email'
              value={email}
              className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type='submit'
              variant='dark'
              className='mt-6 w-full rounded-none text-center'
            >
              <span className='w-full text-center'>Send Magic Link</span>
            </Button>
          </form>
        </div>
      </main>
    </Layout>
  );
}
