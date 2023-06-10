import { ErrorHandler } from '@/modules/system/domain/usecases/error.usecase';
import { PropsWithChildren } from 'react';
import { AppProps } from 'next/app';

export type SystemPropsAdapter = PropsWithChildren<{
  onError: ErrorHandler;
}> & {
  pageProps: AppProps['pageProps'];
};
