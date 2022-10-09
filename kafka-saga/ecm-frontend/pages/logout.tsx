import * as React from 'react';
import { useRouter } from 'next/router';
import { TokenManager } from '@modules/shared/services/token-manager';
import { NoLayout } from '@modules/shared/components/NoLayout';
import { NextPageWithLayout } from './_app';

const LogOutPage: NextPageWithLayout = () => {
  const { replace } = useRouter();

  React.useEffect(() => {
    async function logout() {
      TokenManager.clean();

      await replace('/auth/login');
    }

    logout();
  }, [replace]);

  return <></>;
};

LogOutPage.getLayout = NoLayout;

export default LogOutPage;
