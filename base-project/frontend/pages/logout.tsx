import * as React from 'react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from './_app';
import { TokenManager } from '../modules/shared/services/token-manager';
import { NoLayout } from '../modules/shared/components/NoLayout';
import { AuthApiClient } from '../modules/auth/services/auth-api-client';

const LogOutPage: NextPageWithLayout = () => {
  const router = useRouter();
  React.useEffect(() => {
    async function doLogout() {
      TokenManager.clean();
      await AuthApiClient.logout();
      await router.replace('/login');
    }

    doLogout();
  }, [router]);

  return <></>;
};

LogOutPage.getLayout = NoLayout;

export default LogOutPage;
