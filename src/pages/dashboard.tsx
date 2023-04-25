import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
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
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import * as React from 'react';
import { useEffect } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';

const colors = scaleOrdinal(schemeCategory10).range();

const renderCustomBarLabel = (props: any) => {
  const { x, y, width, height, index } = props;
  const color = colors[index % colors.length];
  return <rect x={x} y={y} width={width} height={height} fill={color} />;
};

export default function HomePage() {
  const { user, error, isLoading } = useUser();
  const [analytics, setAnalytics] = React.useState<any>(null);

  useEffect(() => {
    const getAnalytics = async () => {
      const { data } = await axios.get('/api/info/analytics');
      setAnalytics(data.analytics);
    };

    getAnalytics();
  }, []);

  return (
    <>
      {user && (
        <Layout>
          {/* <Seo templateTitle='Home' /> */}
          <Seo />

          <main className='layout'>
            <div className='flex h-full flex-col justify-center'>
              <>
                <h1 className='text-3xl font-bold'>Dashboard</h1>
                <p className='text-md'>Welcome, {user.name} 👋</p>

                {/* Show a card for individual entries page */}
                <div className='mt-6  flex flex-wrap gap-x-4 md:flex-nowrap'>
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
                        Go to Individual Entries
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
                        Go to Organization Entries
                      </span>
                    </ButtonLink>
                  </div>
                </div>

                <div className='my-8 flex h-full w-full flex-col space-y-4 bg-white p-4'>
                  <div className='flex flex-wrap justify-between md:mx-4 md:flex-nowrap md:gap-x-8'>
                    <div className='w-full rounded-lg px-8 py-8 font-bold shadow-lg md:w-auto'>
                      <span className='text-5xl'>
                        {analytics?.totalEntries}
                      </span>{' '}
                      <span className='text-sm font-normal text-gray-500'>
                        Total Campers
                      </span>
                    </div>
                    <div className='w-full rounded-lg px-8 py-8 font-bold shadow-lg md:w-auto'>
                      <span className='text-5xl'>
                        {analytics?.totalIndividualsEntry}
                      </span>{' '}
                      <span className='text-sm font-normal text-gray-500'>
                        Total Individual Campers
                      </span>
                    </div>
                    <div className='w-full rounded-lg px-8 py-8 font-bold shadow-lg md:w-auto'>
                      <span className='text-5xl'>
                        {analytics?.totalOrganizationsEntry}
                      </span>{' '}
                      <span className='text-sm font-normal text-gray-500'>
                        Total Organization Campers
                      </span>
                    </div>
                    <div className='w-full rounded-lg px-8 py-8 font-bold shadow-lg md:w-auto'>
                      <span className='text-5xl'>
                        {analytics?.totalLeaders}
                      </span>{' '}
                      <span className='text-sm font-normal text-gray-500'>
                        Total Leaders
                      </span>
                    </div>
                  </div>
                  <div className='flex w-full flex-wrap pt-8 md:flex-nowrap '>
                    <div className='w-full md:w-1/3'>
                      <ResponsiveContainer width='100%' height={300}>
                        <BarChart
                          width={500}
                          height={300}
                          data={analytics?.campersByOccupation}
                        >
                          <CartesianGrid strokeDasharray='3 3' />
                          <XAxis dataKey='name' />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey='count' shape={renderCustomBarLabel} />
                        </BarChart>
                      </ResponsiveContainer>
                      <div className='flex justify-center'>
                        Campers by Occupation
                      </div>
                    </div>
                    <div className='w-full md:w-1/3'>
                      <ResponsiveContainer width='100%' height={300}>
                        <BarChart
                          width={500}
                          height={300}
                          data={analytics?.campersByReligion}
                        >
                          <CartesianGrid strokeDasharray='3 3' />
                          <XAxis dataKey='name' />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey='count' shape={renderCustomBarLabel} />
                        </BarChart>
                      </ResponsiveContainer>
                      <div className='flex justify-center'>
                        Campers by Religion
                      </div>
                    </div>
                    <div className='w-full md:w-1/3'>
                      <ResponsiveContainer width='100%' height={300}>
                        <BarChart
                          width={500}
                          height={300}
                          data={analytics?.campersByFoodPreference}
                        >
                          <CartesianGrid strokeDasharray='3 3' />
                          <XAxis dataKey='name' />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey='count' shape={renderCustomBarLabel} />
                        </BarChart>
                      </ResponsiveContainer>
                      <div className='flex justify-center'>
                        Campers by Food Preference
                      </div>
                    </div>
                  </div>
                  <div className='pt-6'>
                    <ResponsiveContainer width='100%' height={300}>
                      <BarChart
                        width={500}
                        height={300}
                        data={analytics?.campersByOrganization}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey='count' shape={renderCustomBarLabel} />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className='flex justify-center'>
                      Campers by Organization(Only for Organization Entries)
                    </div>
                  </div>
                </div>
              </>
            </div>
          </main>
        </Layout>
      )}
    </>
  );
}
