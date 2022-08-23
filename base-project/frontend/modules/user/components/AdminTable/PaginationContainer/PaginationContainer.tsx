import React from 'react';
import { Paginator } from '../../../../shared/components/Pagination/Paginator';
import { usePagination } from '../../../../shared/providers/pagination/pagination.hook';

export function PaginationContainer(): React.ReactElement {
  const { setPagination } = usePagination();

  function onPaginationChange(currentPage: number, currentPageSize: number) {
    setPagination({
      page: currentPage,
      pageSize: currentPageSize
    });
  }

  return (
    <Paginator
      className="py-2"
      totalPage={100}
      onPaginationChange={onPaginationChange}
    />
  );
}
