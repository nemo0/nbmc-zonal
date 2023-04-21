import React from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';

export default function Footer() {
  return (
    <footer className='bottom-2 text-center text-gray-700'>
      © {new Date().getFullYear()} By{' '}
      <UnderlineLink href='https://subhachanda.com'>Subha</UnderlineLink>
    </footer>
  );
}
