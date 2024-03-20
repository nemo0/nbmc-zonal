import React from 'react';

export default function Footer() {
  return (
    <footer className='bottom-2 text-center text-gray-700'>
      © {new Date().getFullYear()}
    </footer>
  );
}
