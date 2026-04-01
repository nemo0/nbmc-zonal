import { GetServerSidePropsContext } from 'next';
import * as React from 'react';

import { getApprovedAdminFromRequest } from '@/lib/adminAuth';

import Layout from '@/components/layout/Layout';
import Datatable from '@/components/Partials/OrganizationDatatable';
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
        <div className='mt-10'>
          <Datatable />
        </div>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const auth = await getApprovedAdminFromRequest(context.req, context.res);

  if (!auth.ok) {
    return {
      redirect: {
        destination: auth.status === 403 ? '/login?error=forbidden' : '/login',
        permanent: false,
      },
    };
  }

  return { props: {} };
}
