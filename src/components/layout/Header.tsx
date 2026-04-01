import * as React from 'react';

import useAdminUser from '@/lib/useAdminUser';

import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';

export default function Header() {
  const { user, isLoading } = useAdminUser();

  return (
    <header className='sticky top-0 z-50 bg-white'>
      <div className='layout flex h-14 items-center justify-between'>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
          Home
        </UnstyledLink>
        <nav>
          <ul className='flex items-center justify-between space-x-2 md:space-x-4'>
            {/* {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink
                  href={href}
                  className='text-sm hover:text-gray-600 md:text-base'
                >
                  {label}
                </UnstyledLink>
              </li>
            ))} */}
            {user ? (
              <>
                <li>
                  <UnstyledLink
                    href='/dashboard'
                    className='text-sm hover:text-gray-600 md:text-base'
                  >
                    Dashboard
                  </UnstyledLink>
                </li>
                <li>
                  <ButtonLink
                    className='rounded-none px-2 py-1 text-xs md:px-4 md:py-2  md:text-sm md:font-medium'
                    variant='dark'
                    href='/api/auth/logout'
                  >
                    <span className='w-full text-center'>Logout</span>
                  </ButtonLink>
                </li>
              </>
            ) : !isLoading ? (
              <li>
                <ButtonLink
                  href='/login'
                  className='rounded-none  px-4 py-2  text-sm font-medium'
                  variant='dark'
                >
                  Admin Login
                </ButtonLink>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
    </header>
  );
}
