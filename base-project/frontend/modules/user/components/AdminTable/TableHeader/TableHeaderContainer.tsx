import React from 'react';
import { Flex } from '@chakra-ui/react';
import { HeaderActions } from './HeaderActions';
import { ContentHeader } from '@/modules/shared/components/Header/ContentHeader/ContentHeader';

export function TableHeaderContainer(): React.ReactElement {
  return (
    <Flex justifyContent="space-between" className="pb-2">
      <div>
        <ContentHeader
          main={'Administrator management'}
          brief={'Where you can create, update and change user active'}
        />
      </div>

      <HeaderActions />
    </Flex>
  );
}
