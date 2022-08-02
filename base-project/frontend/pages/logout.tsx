import * as React from 'react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from './_app';
import { TokenManager } from '../modules/shared/services/token-manager';
import { NoLayout } from '../modules/shared/components/NoLayout';

const LogOutPage: NextPageWithLayout = () => {
  const router = useRouter();
  React.useEffect(() => {
    TokenManager.clean();
    router.replace('/login');
  }, [router]);

  return <></>;
};

LogOutPage.getLayout = NoLayout;

export default LogOutPage;
