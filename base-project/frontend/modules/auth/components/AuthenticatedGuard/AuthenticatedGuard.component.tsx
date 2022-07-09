import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { useProtectPublicPageGuard } from '../../hooks/useProtectPublicPageGuard';
import { UserContext } from '../../../user/contexts/user.context';
import { useQueryMyProfile } from '../../../user/hooks/useQueryMyProfile';
import { useClientErrorHandler } from '../../../error-handling/useClientErrorHandler';
import { RenewToken } from '../../../shared/services/renewToken';
import { BrowserStorage } from '../../../shared/services/browser-storage';

type AuthenticatedGuardProps = PropsWithChildren<{
  publicRoutes: string[];
  defaultRoute: string;
}>;

export function AuthenticatedGuard(
  props: AuthenticatedGuardProps
): React.ReactElement {
  const router = useRouter();
  const errorHandler = useClientErrorHandler();

  const { dispatch: setUser } = React.useContext(UserContext);

  const protectPublicPageGuard = useProtectPublicPageGuard({
    publicRoutes: props.publicRoutes,
    accessPathName: router.pathname
  });
  const {
    refetch: fetchMyProfile,
    data,
    error,
    isLoading
  } = useQueryMyProfile();

  React.useEffect(() => {
    async function protectPage() {
      if (!protectPublicPageGuard.canAccess()) {
        await router.push(props.defaultRoute);
      }
      fetchMyProfile();
    }
    protectPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.publicRoutes, router.pathname, fetchMyProfile]);

  React.useEffect(() => {
    async function handleError() {
      if (error) {
        const { clientCode } = errorHandler.handle(error);
        if (clientCode === '401') {
          await RenewToken.renew();
          fetchMyProfile();
        }
        if (clientCode === 'LOGOUT_REQUIRED') {
          BrowserStorage.remove('accessToken');
          BrowserStorage.remove('refreshToken');
          window.location.reload();
        }
      }
    }

    handleError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  React.useEffect(() => {
    if (data) {
      setUser(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <>{!isLoading && props.children}</>;
}
