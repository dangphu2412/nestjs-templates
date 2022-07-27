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
  return (
    <>
      <AuthenticatedGuard publicRoutes={['/login']} defaultRoute="/">
        <Grid h="100vh" templateColumns="repeat(6, 1fr)" gap={4}>
          <GridItem colSpan={1}>
            <SideBar />
          </GridItem>

          <GridItem colSpan={5}>
            <Header />
            {children}
            <Footer />
          </GridItem>
        </Grid>
      </AuthenticatedGuard>
    </>
  );
}
