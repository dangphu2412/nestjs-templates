import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { Header } from '../../components/Header/Header';
import { ChildrenPropOnly } from '../../types/react.types';
import { AuthenticatedGuard } from '../../../auth/components/AuthenticatedGuard/AuthenticatedGuard.component';

type AdminLayoutProps = ChildrenPropOnly;

export function AdminLayout({
  children
}: AdminLayoutProps): React.ReactElement {
  return (
    <>
      <AuthenticatedGuard publicRoutes={['/login']} defaultRoute="/">
        <Grid
          h="200px"
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={3} colSpan={1} bg="tomato">
            Left Menu
          </GridItem>
          <GridItem colSpan={4} bg="papayawhip">
            <Header />
          </GridItem>
          <GridItem colSpan={4} bg="tomato">
            {children}
          </GridItem>
          <GridItem colSpan={4} bg="tomato">
            Footer
          </GridItem>
        </Grid>
      </AuthenticatedGuard>
    </>
  );
}
