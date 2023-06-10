import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { UserIdentity } from '@/modules/auth/services/user-identity';
import { useUser } from '@/modules/user/contexts/UserContext/useUser.hook';
import { useQueryMyProfile } from '../../../user/hooks/data/useQueryMyProfile';

type AuthenticatedGuardProps = PropsWithChildren<{
  fallbackRoute: string;
}>;

export function AuthenticatedGuard({
  fallbackRoute,
  children
}: AuthenticatedGuardProps): React.ReactElement {
  const { push } = useRouter();
  const { dispatch: setUser } = useUser();
  const isAuthenticated = UserIdentity.isAuthenticated();

  const { data, status } = useQueryMyProfile({ enabled: isAuthenticated });

  React.useEffect(() => {
    if (isAuthenticated) {
      return;
    }

    push(fallbackRoute);
  }, [data, fallbackRoute, isAuthenticated, push, status]);

  React.useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return <>{status === 'success' && children}</>;
}
