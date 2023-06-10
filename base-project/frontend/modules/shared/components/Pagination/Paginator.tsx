import React from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { Flex } from '@chakra-ui/react';
import { ItemPerPageSelector } from './ItemPerPageSelector/ItemPerPageSelector';

type Props = {
  className?: string | undefined;
  defaultPage?: number;
  defaultPageSize?: number;
  pageSizeItems?: number[];
  totalRecords: number;
  onPaginationChange(page: number, pageSize: number): void;
};

export function Paginator({
  defaultPage = 1,
  defaultPageSize = 10,
  pageSizeItems = [10, 20, 30, 40, 50],
  totalRecords,
  onPaginationChange,
  className
}: Props): React.ReactElement {
  const [page, setPage] = React.useState(defaultPage);
  const [pageSize, setPageSize] = React.useState(defaultPageSize);
  const onChange = (currentPage: number, currentPageSize: number) => {
    if (currentPage !== page) {
      setPage(currentPage);
    }

    if (currentPageSize !== pageSize) {
      setPageSize(currentPageSize);
    }

    onPaginationChange(currentPage, currentPageSize);
  };

  return (
    <Flex className={className}>
      <Pagination
        defaultCurrent={defaultPage}
        current={page}
        defaultPageSize={defaultPageSize}
        pageSize={pageSize}
        onChange={onChange}
        total={totalRecords}
      />

      <ItemPerPageSelector
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageSizeItems={pageSizeItems}
      />
    </Flex>
  );
}
