import { extendTheme } from '@chakra-ui/react';

export const chakraTheme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: '#f8f9fa'
      }
    })
  }
});
