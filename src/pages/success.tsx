import * as React from 'react';

import Layout from '@/components/layout/Layout';
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
            <h1 className='mb-6 mt-4'>
              39th North Bengal Zonal Youth Training Camp 2023{' '}
            </h1>

            <div className='w-3/4'>
              You have successfully registered for the 39th North Bengal Zonal
              Youth Training Camp 2023. Please check your email for further
              instructions.
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}