import { useRouter } from 'next/router';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';

import { magic } from '@/lib/magic';
import { UserContext } from '@/lib/UserContext';

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

  const logout = async () => {
    // We'll fill in the rest of this later
    magic &&
      magic.user.logout().then(() => {
        setUser({ user: null });
        router.push('/login');
      });
  };

  useEffect(() => {
    // Check for an issuer on our user object. If it exists, route them to the dashboard.
    !user && router.push('/login');
  }, [user]);

  return (
    <>
      {user?.issuer && (
        <Layout>
          {/* <Seo templateTitle='Home' /> */}
          <Seo />

          <main className='layout'>
            <h4 className='my-6 text-center'>
              <UnderlineLink href='/dashboard'>Dashboard</UnderlineLink>
            </h4>
            <div>
              <>
                <h1>Dashboard</h1>
                <h2>Email</h2>
                <p>{user.email}</p>
                <h2>Wallet Address</h2>
                <p>{user.publicAddress}</p>
                <button onClick={logout}>Logout</button>
              </>
            </div>
          </main>
        </Layout>
      )}
    </>
  );
}
