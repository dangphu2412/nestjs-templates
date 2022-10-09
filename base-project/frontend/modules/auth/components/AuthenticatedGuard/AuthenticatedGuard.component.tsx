import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { UserIdentity } from '@modules/auth/services/user-identity';
import { UserContext } from '../../../user/contexts/UserContext/user.context';
import { useQueryMyProfile } from '../../../user/hooks/data/useQueryMyProfile';
import { useClientErrorHandler } from '../../../error-handling/useClientErrorHandler';
import { TokenManager } from '../../../shared/services/token-manager';
import { ClientErrorCode } from '../../../error-handling/client-code';

type AuthenticatedGuardProps = PropsWithChildren<{
  authRoutes: string[];
  fallbackRoute: string;
}>;

export function AuthenticatedGuard({
  authRoutes,
  fallbackRoute,
  children
}: AuthenticatedGuardProps): React.ReactElement {
  const { pathname, push } = useRouter();
  const errorHandler = useClientErrorHandler();

  const { dispatch: setUser } = React.useContext(UserContext);

  const { refetch: fetchMyProfile, data, error, status } = useQueryMyProfile();

  React.useEffect(() => {
    async function protectPage() {
      const isNotLoggedIn = !UserIdentity.isAuthenticated();
      const isNotAuthRoutes = !authRoutes.includes(pathname);

      if (isNotLoggedIn && isNotAuthRoutes) {
        await push(fallbackRoute);

        return;
      }

      if (!data && status === 'idle') {
        await fetchMyProfile();
      }
    }

    protectPage();
  }, [data, status, fetchMyProfile, authRoutes, pathname, push, fallbackRoute]);

  React.useEffect(() => {
    async function handleError() {
      if (error) {
        const { clientCode } = errorHandler.handle(error);

        if (clientCode === ClientErrorCode.UNAUTHORIZED) {
          try {
            await TokenManager.renew();
            await fetchMyProfile();
          } catch (renewTokenError) {
            const { clientCode: renewClientCode } =
              errorHandler.handle(renewTokenError);

            if (
              [
                ClientErrorCode.INVALID_TOKEN_FORMAT,
                ClientErrorCode.LOGOUT_REQUIRED
              ].includes(renewClientCode)
            ) {
              await push('/logout');
            }
          }
        }
      }
    }

    handleError();
  }, [error, errorHandler, fetchMyProfile, push]);

  React.useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return <>{status === 'success' && children}</>;
}
