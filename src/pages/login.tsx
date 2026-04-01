import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';

import { getApprovedAdminFromRequest } from '@/lib/adminAuth';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loadingAction, setLoadingAction] = useState<'login' | 'signup' | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const queryError =
    router.query.error === 'forbidden'
      ? 'Your account is authenticated but not approved for admin access.'
      : '';

  const handleAuth = async (action: 'login' | 'signup') => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      setErrorMessage('Email and password are required');
      return;
    }

    if (action === 'signup' && normalizedPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters');
      return;
    }

    try {
      setLoadingAction(action);
      setErrorMessage('');
      const endpoint =
        action === 'login' ? '/api/auth/login' : '/api/auth/signup';

      await axios.post(endpoint, {
        email: normalizedEmail,
        password: normalizedPassword,
        name: name.trim(),
      });

      router.push('/dashboard');
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.error as string) ||
          'Unable to authenticate with the provided credentials'
        : 'Unable to authenticate with the provided credentials';
      setErrorMessage(message);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main className='layout flex h-[85vh] flex-col justify-center'>
        <h4 className='my-6 text-center'>
          <UnderlineLink href='/login'>Login</UnderlineLink>
        </h4>
        <div>
          <form
            className='mx-auto w-full md:w-7/12'
            onSubmit={(event) => {
              event.preventDefault();
              handleAuth('login');
            }}
          >
            <label htmlFor='name'>Name (optional for first-time signup)</label>
            <input
              name='name'
              type='text'
              value={name}
              className='mb-4 w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              onChange={(event) => setName(event.target.value)}
            />
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='email'
              value={email}
              className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <label htmlFor='password' className='mt-4 block'>
              Password
            </label>
            <input
              name='password'
              type='password'
              value={password}
              className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
            />
            {(queryError || errorMessage) && (
              <p className='mt-4 text-sm text-red-600'>
                {errorMessage || queryError}
              </p>
            )}
            <div className='mt-6 flex gap-x-2'>
              <Button
                type='submit'
                variant='dark'
                className='w-full rounded-none text-center'
                disabled={
                  loadingAction !== null || !email.trim() || !password.trim()
                }
              >
                <span className='w-full text-center'>
                  {loadingAction === 'login' ? 'Signing in...' : 'Sign In'}
                </span>
              </Button>
              <Button
                type='button'
                variant='light'
                className='w-full rounded-none border text-center'
                disabled={
                  loadingAction !== null || !email.trim() || !password.trim()
                }
                onClick={() => handleAuth('signup')}
              >
                <span className='w-full text-center'>
                  {loadingAction === 'signup'
                    ? 'Creating...'
                    : 'Create Account'}
                </span>
              </Button>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const auth = await getApprovedAdminFromRequest(context.req, context.res);

  if (auth.ok) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return { props: {} };
}
