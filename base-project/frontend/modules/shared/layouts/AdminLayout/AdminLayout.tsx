import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { Header } from '../../components/Header/Header';
import { ChildrenPropOnly } from '../../types/react.types';
import { AuthenticatedGuard } from '../../../auth/components/AuthenticatedGuard/AuthenticatedGuard.component';
import { SideBar } from '../../../menu/components/SideBar';
import { Footer } from '../../components/Footer';

type AdminLayoutProps = ChildrenPropOnly;

export function AdminLayout({
  children
}: AdminLayoutProps): React.ReactElement {
  const headerRef = React.useRef(null);
  const footerRef = React.useRef(null);

  return (
    <>
      <AuthenticatedGuard publicRoutes={['/login']} defaultRoute="/login">
        <Grid h="100vh" templateColumns="repeat(6, 1fr)" gap={4}>
          <GridItem colSpan={1}>
            <SideBar />
          </GridItem>

          <GridItem colSpan={5}>
            <Header ref={headerRef} />

            <div className="p-6 h-screen">{children}</div>

            <Footer ref={footerRef} />
          </GridItem>
        </Grid>
      </AuthenticatedGuard>
    </>
  );
}
