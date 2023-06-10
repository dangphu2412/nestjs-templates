import '../styles/globals.scss';
import '../styles/typography.module.scss';
import { UserProvider } from '@/modules/user/contexts/UserContext/user.provider';
import { AdminLayout } from '@/modules/shared/layouts/AdminLayout/AdminLayout';
import { useHandleError } from '@/modules/system/app/internal/useHandleError';
import { SystemProvider } from '@/modules/system/infrastructure/system.provider';
import { AppPropsWithLayout } from '@/modules/system/infrastructure/next.types';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const handleError = useHandleError();

  const renderLayout =
    Component.getLayout ?? (page => <AdminLayout>{page}</AdminLayout>);

  return (
    <SystemProvider onError={handleError} pageProps={pageProps}>
      <UserProvider>{renderLayout(<Component {...pageProps} />)}</UserProvider>
    </SystemProvider>
  );
}

export default MyApp;
