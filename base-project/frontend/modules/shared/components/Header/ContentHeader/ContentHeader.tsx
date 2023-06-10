import React, { ReactElement } from 'react';
import { Text } from '@chakra-ui/react';

type Props = {
  main: string;
  brief: string;
};

export function ContentHeader({ main, brief }: Props): ReactElement {
  return (
    <>
      <Text fontSize="lg" fontWeight="semibold">
        {main}
      </Text>
      <Text fontSize="sm" fontWeight="light">
        {brief}
      </Text>
    </>
  );
}
