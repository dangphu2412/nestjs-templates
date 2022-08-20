import React from 'react';
import { PageSelector } from '../../../../shared/components/Pagination/PageSelector/PageSelector';
import { ItemPerPageSelector } from '../../../../shared/components/Pagination/ItemPerPageSelector/ItemPerPageSelector';

export function PaginationContainer(): React.ReactElement {
  return (
    <>
      <PageSelector />
      <ItemPerPageSelector />
    </>
  );
}
