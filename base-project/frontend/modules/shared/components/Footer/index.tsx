import React from 'react';
import { Flex } from '@chakra-ui/react';
import Link from 'next/link';

export function Footer(): React.ReactElement {
  return (
    <Flex justifyContent="space-between" alignItems="center" className="m-6">
      <p>© 2022, made with by Phu Dang for a better web.</p>

      <p className="space-x-4">
        <Link href="/about-us">About Us</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/license">License</Link>
      </p>
    </Flex>
  );
}
