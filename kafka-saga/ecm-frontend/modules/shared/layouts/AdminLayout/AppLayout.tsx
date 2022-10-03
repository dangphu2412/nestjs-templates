import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Header } from '../../components/Header/Header';
import { ChildrenPropOnly } from '../../types/react.types';
import { AuthenticatedGuard } from '../../../auth/components/AuthenticatedGuard/AuthenticatedGuard.component';
import { Footer } from '../../components/Footer';

type AdminLayoutProps = ChildrenPropOnly;

export function AppLayout({ children }: AdminLayoutProps): React.ReactElement {
  const footerRef = React.useRef(null);

  return (
    <AuthenticatedGuard publicRoutes={['/login']} defaultRoute="/login">
      <Flex h="100vh" gap={4} paddingY="1.5rem">
        <Box flex={1}>
          <Header />

          <div className="p-6">{children}</div>

          <Footer ref={footerRef} />
        </Box>
      </Flex>
    </AuthenticatedGuard>
  );
}
