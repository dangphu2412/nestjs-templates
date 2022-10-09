import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { TokenManager } from '@modules/shared/services/token-manager';
import { UserIdentity } from '@modules/auth/services/user-identity';
import { UserContext } from '../../../user/contexts/UserContext/user.context';
import { useQueryMyProfile } from '../../../user/hooks/data/useQueryMyProfile';
import { useClientErrorHandler } from '../../../error-handling/useClientErrorHandler';

type AuthenticatedGuardProps = PropsWithChildren<{
  fallbackRoute: string;
  authRoutes: string[];
}>;

export function AuthGuard({
  authRoutes,
  fallbackRoute,
  children
}: AuthenticatedGuardProps): React.ReactElement {
  const { pathname, push } = useRouter();
  const errorHandler = useClientErrorHandler();

  const { dispatch: setUser } = React.useContext(UserContext);

  const { refetch: fetchMyProfile, data, error, status } = useQueryMyProfile();

  React.useEffect(() => {
    async function protectAuthPage() {
      const isLoggedIn = UserIdentity.isAuthenticated();
      const isAuthRoute = authRoutes.includes(pathname);

      if (isLoggedIn && !isAuthRoute && !data && status === 'idle') {
        await fetchMyProfile();

        return;
      }

      if (isLoggedIn && isAuthRoute) {
        await push(fallbackRoute);
      }
    }

    protectAuthPage();
  }, [data, status, fetchMyProfile, pathname, authRoutes, fallbackRoute, push]);

  React.useEffect(() => {
    async function handleError() {
      if (error) {
        TokenManager.clean();
      }
    }

    handleError();
  }, [error, errorHandler, fallbackRoute, fetchMyProfile, push]);

  React.useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return <>{children}</>;
}
