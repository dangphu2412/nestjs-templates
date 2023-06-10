import { ToastId, useToast } from '@chakra-ui/react';
import { UseToastOptions } from '@chakra-ui/toast/dist/declarations/src/use-toast';

type NotifyProps = Omit<UseToastOptions, 'duration' | 'isClosable'>;

type Notifier = (props: NotifyProps) => ToastId;

export function useNotify(): Notifier {
  const toast = useToast();

  return ({ ...options }: NotifyProps = {}) =>
    toast({
      ...{
        duration: 5000,
        isClosable: true,
        position: 'top'
      },
      ...options
    });
}
