import * as React from 'react';
import { useRouter } from 'next/router';
import { TokenManager } from '@modules/shared/services/token-manager';
import { NoLayout } from '@modules/shared/components/NoLayout';
import { AuthApiClient } from '@modules/auth/services/auth-api-client';
import { NextPageWithLayout } from './_app';

const LogOutPage: NextPageWithLayout = () => {
  const router = useRouter();
  React.useEffect(() => {
    async function doLogout() {
      await AuthApiClient.logout();
      TokenManager.clean();
      await router.replace('/login');
    }

    doLogout();
  }, [router]);

  return <></>;
};

LogOutPage.getLayout = NoLayout;

export default LogOutPage;
