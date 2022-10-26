import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { UserIdentity } from '@modules/auth/services/user-identity';
import { UserContext } from '../../../user/contexts/UserContext/user.context';
import { useQueryMyProfile } from '../../../user/hooks/data/useQueryMyProfile';
import { useClientErrorHandler } from '../../../error-handling/useClientErrorHandler';
import { TokenManager } from '../../../shared/services/token-manager';
import { ClientErrorCode } from '../../../error-handling/client-code';

type AuthenticatedGuardProps = PropsWithChildren<{
  fallbackRoute: string;
}>;

export function AuthenticatedGuard({
  fallbackRoute,
  children
}: AuthenticatedGuardProps): React.ReactElement {
  const { pathname, push } = useRouter();
  const { handle, handleExpireLogin } = useClientErrorHandler();

  const { dispatch: setUser } = React.useContext(UserContext);

  const { refetch: fetchMyProfile, data, error, status } = useQueryMyProfile();

  React.useEffect(() => {
    async function protectPage() {
      if (!UserIdentity.isAuthenticated()) {
        await push(fallbackRoute);
        return;
      }

      if (!data && status === 'idle') {
        await fetchMyProfile();
      }
    }

    protectPage();
  }, [data, status, fetchMyProfile, pathname, push, fallbackRoute]);

  React.useEffect(() => {
    async function handleError() {
      if (!error) {
        return;
      }

      const { clientCode } = handle(error);

      if (clientCode === ClientErrorCode.UNAUTHORIZED) {
        try {
          await TokenManager.renew();
          await fetchMyProfile();
        } catch (renewTokenError) {
          handleExpireLogin(renewTokenError);
        }
      }
    }

    handleError();
  }, [error, fetchMyProfile, handle, handleExpireLogin, push]);

  React.useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return <>{status === 'success' && children}</>;
}
