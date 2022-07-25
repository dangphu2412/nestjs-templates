import React from 'react';
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
        <Header />
        {children}
      </AuthenticatedGuard>
    </>
  );
}
