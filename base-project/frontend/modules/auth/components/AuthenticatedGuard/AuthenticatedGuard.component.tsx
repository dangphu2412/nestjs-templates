import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../../../user/contexts/user.context';
import { useQueryMyProfile } from '../../../user/hooks/data/useQueryMyProfile';
import { useClientErrorHandler } from '../../../error-handling/useClientErrorHandler';
import { TokenManager } from '../../../shared/services/token-manager';
import { ClientErrorCode } from '../../../error-handling/client-code';
import { ProtectPrivateGuard } from '../../guards/protect-private.guard';

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

  const { refetch: fetchMyProfile, data, error, status } = useQueryMyProfile();

  React.useEffect(() => {
    async function protectPage() {
      if (
        !ProtectPrivateGuard.canAccess({
          publicRoutes: props.publicRoutes,
          accessPathName: router.pathname
        })
      ) {
        await router.push(props.defaultRoute);
        return;
      }
      if (!data && status === 'idle') {
        await fetchMyProfile();
      }
    }

    protectPage();
  }, [
    data,
    status,
    fetchMyProfile,
    props.publicRoutes,
    props.defaultRoute,
    router.pathname,
    router
  ]);

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
              await router.push('/logout');
            }
          }
        }
      }
    }

    handleError();
  }, [error, errorHandler, fetchMyProfile, router]);

  React.useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return <>{status === 'success' && props.children}</>;
}
