import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';

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
  const { user } = useUser();
  const [email, setEmail] = useState('');

  const router = useRouter();

  useEffect(() => {
    // Check for an issuer on our user object. If it exists, route them to the dashboard.
    router.push('/api/auth/login');
  }, [user]);

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main className='layout flex h-[85vh] flex-col justify-center'>
        <h4 className='my-6 text-center'>
          <UnderlineLink href='/login'>Login</UnderlineLink>
        </h4>
        <div>
          <form className='mx-auto w-full md:w-7/12'>
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
