import { ReactElement } from 'react';
import { chakraTheme } from '@/modules/system/infrastructure/chakra-ui.config';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import * as React from 'react';
import { getQueryClientConfig } from '@/modules/system/infrastructure/react-query.config';
import { SystemPropsAdapter } from '@/modules/system/infrastructure/system-props.adapter';
import { Provider } from 'react-redux';
import { store } from '@/modules/system/infrastructure/redux.config';

export function SystemProvider({
  onError,
  children,
  pageProps
}: SystemPropsAdapter): ReactElement {
  const [queryClient] = React.useState(
    () =>
      new QueryClient(
        getQueryClientConfig({
          onError
        })
      )
  );

  return (
    <ChakraProvider theme={chakraTheme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>{children}</Provider>
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
