import * as React from 'react';

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
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            {/* <Vercel className='text-5xl' /> */}
            <h1 className='mt-4'>
              39th North Bengal Zonal Youth Training Camp 2023{' '}
            </h1>
            <p className='mt-2 text-sm text-gray-800'>
              Register for the 39th North Bengal Zonal Youth Training Camp 2023
            </p>

            <div className='flex gap-x-4'>
              <ButtonLink className='mt-6' href='/individual' variant='dark'>
                Individual Registration
              </ButtonLink>
              <ButtonLink className='mt-6' href='/organization' variant='light'>
                Organization Registration
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
