import Image from 'next/image';
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
          <div className='layout relative flex h-[85vh] flex-col items-center justify-center py-12 text-center'>
            {/* <Vercel className='text-5xl' /> */}
            <Image src='/images/logo.png' alt='logo' height={120} width={120} />
            <h1 className='mt-4'>
              39th North Bengal Zonal Youth Training Camp 2023{' '}
            </h1>
            <p className='mt-2 text-sm text-gray-800'>
              Register for the 39th North Bengal Zonal Youth Training Camp 2023
            </p>

            <div className='flex gap-x-4'>
              {/* <ButtonLink className='mt-6' href='/individual' variant='dark'>
                Individual Registration
              </ButtonLink>
              <ButtonLink className='mt-6' href='/organization' variant='light'>
                Organization Registration
              </ButtonLink> */}
            </div>
            <div className='text-xl font-bold text-red-500'>
              Registration for the 39th North Bengal Zonal Youth Training Camp
              is now closed.
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
