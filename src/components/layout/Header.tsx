import { useRouter } from 'next/router';
import * as React from 'react';

import { magic } from '@/lib/magic';
import { UserContext } from '@/lib/UserContext';

import Button from '@/components/buttons/Button';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';

const links = [
  { href: '/individual', label: 'Individual' },
  { href: '/organization', label: 'Organization' },
];

export default function Header() {
  const [user, setUser] = React.useContext(UserContext);

  const router = useRouter();

  const logout = async () => {
    // We'll fill in the rest of this later
    magic &&
      magic.user.logout().then(() => {
        setUser({ user: null });
        router.push('/login');
      });
  };
  return (
    <header className='sticky top-0 z-50 bg-white'>
      <div className='layout flex h-14 items-center justify-between'>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
          Home
        </UnstyledLink>
        <nav>
          <ul className='flex items-center justify-between space-x-4'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink href={href} className='hover:text-gray-600'>
                  {label}
                </UnstyledLink>
              </li>
            ))}
            {user?.issuer ? (
              <>
                <li>
                  <UnstyledLink
                    href='/dashboard'
                    className='hover:text-gray-600'
                  >
                    Dashboard
                  </UnstyledLink>
                </li>
                <li>
                  <Button
                    onClick={logout}
                    className='rounded-none  px-4 py-2  text-sm font-medium'
                    variant='dark'
                  >
                    <span className='w-full text-center'>Logout</span>
                  </Button>
                </li>
              </>
            ) : (
              <li>
                <ButtonLink
                  href='/login'
                  className='rounded-none  px-4 py-2  text-sm font-medium'
                  variant='dark'
                >
                  Login
                </ButtonLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
