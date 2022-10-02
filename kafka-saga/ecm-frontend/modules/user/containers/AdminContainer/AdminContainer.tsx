import React from 'react';
import { PaginationProvider } from '../../../shared/common/pagination/pagination.provider';
import { Box } from '../../../shared/components/Box';
import { ChildrenPropOnly } from '../../../shared/types/react.types';

export function AdminContainer({
  children
}: ChildrenPropOnly): React.ReactElement {
  return (
    <PaginationProvider>
      <Box>{children}</Box>
    </PaginationProvider>
  );
}
