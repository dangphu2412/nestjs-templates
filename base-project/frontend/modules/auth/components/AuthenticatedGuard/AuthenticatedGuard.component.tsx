import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../../../user/contexts/user.context';
import { useQueryMyProfile } from '../../../user/hooks/useQueryMyProfile';
import { useClientErrorHandler } from '../../../error-handling/useClientErrorHandler';
import { TokenManager } from '../../../shared/services/token-manager';
import { ClientErrorCode } from '../../../error-handling/client-code';
import { ProtectPublicPageGuard } from '../../guards/protectPublicPage.guard';

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

  const {
    refetch: fetchMyProfile,
    data,
    error,
    status,
    isFetching
  } = useQueryMyProfile();

  React.useEffect(() => {
    async function protectPage() {
      if (
        !ProtectPublicPageGuard.canAccess({
          publicRoutes: props.publicRoutes,
          accessPathName: router.pathname
        })
      ) {
        await router.push(props.defaultRoute);
      }
      if (!data && status === 'idle') {
        await fetchMyProfile();
      }
    }
    protectPage();
  }, [
    data,
    status,
    props.publicRoutes,
    router.pathname,
    fetchMyProfile,
    props.defaultRoute,
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
          } catch (e) {
            // TODO: Handle if renew failed
            console.log(e);
          }
        }
        if (clientCode === 'LOGOUT_REQUIRED') {
          TokenManager.refresh();
          window.location.reload();
        }
      }
    }

    handleError();
  }, [error, errorHandler, fetchMyProfile]);

  React.useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return <>{isFetching !== undefined && !isFetching && props.children}</>;
}
