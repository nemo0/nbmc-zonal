import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';

import Layout from '@/components/layout/Layout';
import Datatable from '@/components/Partials/IndividualDatatable';
import Seo from '@/components/Seo';
import Skeleton from '@/components/Skeleton';

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
  const router = useRouter();

  useEffect(() => {
    // Check for an issuer on our user object. If it exists, route them to the dashboard.
    !user && router.push('/api/auth/login');
  }, [user]);

  return (
    <>
      {user ? (
        <Layout>
          {/* <Seo templateTitle='Home' /> */}
          <Seo />

          <main className='layout'>
            <div className='mt-10'>
              <>
                <Datatable />
              </>
            </div>
          </main>
        </Layout>
      ) : (
        <Skeleton className='h-[85vh]' />
      )}
    </>
  );
}
