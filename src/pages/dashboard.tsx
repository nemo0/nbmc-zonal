import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
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
  const { user, error, isLoading } = useUser();

  const router = useRouter();

  useEffect(() => {
    // Check for an issuer on our user object. If it exists, route them to the dashboard.
    !user && router.push('/login');
  }, [user]);

  return (
    <>
      {user && (
        <Layout>
          {/* <Seo templateTitle='Home' /> */}
          <Seo />

          <main className='layout'>
            <div className='flex h-[85vh] flex-col justify-center'>
              <>
                <h1 className='text-3xl font-bold'>Dashboard</h1>

                {/* Show a card for individual entries page */}
                <div className='flex  h-40 flex-wrap gap-x-4 md:flex-nowrap'>
                  <div className='flex h-full w-full flex-col  space-y-4 rounded-lg bg-white p-4 shadow-lg'>
                    <h2 className='text-2xl font-bold'>Individual</h2>
                    <p className='text-gray-500'>
                      View and Export Individual Campers List
                    </p>
                    <ButtonLink
                      href='/list/individual'
                      className='rounded-none  px-4 py-2  text-sm font-medium'
                      variant='dark'
                    >
                      <span className='w-full text-center'>
                        Go to Individual
                      </span>
                    </ButtonLink>
                  </div>
                  <div className='flex h-full w-full flex-col  space-y-4 rounded-lg bg-white p-4 shadow-lg'>
                    <h2 className='text-2xl font-bold'>Organization</h2>
                    <p className='text-gray-500'>
                      View and Export Organization Campers List
                    </p>
                    <ButtonLink
                      href='/list/organization'
                      className='rounded-none  px-4 py-2 text-sm font-medium '
                      variant='dark'
                    >
                      <span className='w-full text-center'>
                        Go to Organization
                      </span>
                    </ButtonLink>
                  </div>
                </div>

                {/* <Datatable /> */}
              </>
            </div>
          </main>
        </Layout>
      )}
    </>
  );
}
