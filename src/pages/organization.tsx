import * as React from 'react';

import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import OrganizationForm from '@/components/Partials/OrganizationForm';
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

      <main className='layout'>
        <h4 className='my-6 text-center'>
          <UnderlineLink href='/organization'>
            Organization Registration
          </UnderlineLink>
        </h4>
        <h5 className='my-6 text-center text-red-500'>
          If you are facing any issues with the form, please contact at{' '}
          <UnderlineLink href='tel:7602110080'>7602110080</UnderlineLink>
        </h5>
        <OrganizationForm />
      </main>
    </Layout>
  );
}
