import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { TokenManager } from '@modules/shared/services/token-manager';
import { UserIdentity } from '@modules/auth/services/user-identity';
import { useUser } from '@modules/user/contexts/UserContext/useUser.hook';
import { useQueryMyProfile } from '../../../user/hooks/data/useQueryMyProfile';

type AuthenticatedGuardProps = PropsWithChildren<{
  fallbackRoute: string;
  authRoutes: string[];
}>;

export function AuthGuard({
  authRoutes,
  fallbackRoute,
  children
}: AuthenticatedGuardProps): React.ReactElement {
  const { dispatch: setUser } = useUser();
  const { pathname, push } = useRouter();
  const { refetch: getMyProfile, data, error, status } = useQueryMyProfile();

  React.useEffect(() => {
    async function protectAuthPage() {
      const isLoggedIn = UserIdentity.isAuthenticated();
      const isAuthRoute = authRoutes.includes(pathname);

      const shouldGetMyProfile =
        isLoggedIn && !isAuthRoute && !data && status === 'idle';
      const shouldFallback = isLoggedIn && isAuthRoute;

      if (shouldGetMyProfile) {
        await getMyProfile();

        return;
      }

      if (shouldFallback) {
        await push(fallbackRoute);
      }
    }

    protectAuthPage();
  }, [data, status, getMyProfile, pathname, authRoutes, fallbackRoute, push]);

  React.useEffect(() => {
    async function handleError() {
      if (error) {
        TokenManager.clean();
      }
    }

    handleError();
  }, [error, fallbackRoute, getMyProfile, push]);

  React.useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return <>{children}</>;
}
