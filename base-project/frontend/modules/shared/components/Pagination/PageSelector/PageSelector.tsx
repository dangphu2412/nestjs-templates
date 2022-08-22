import React from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { ItemPerPageSelector } from '../ItemPerPageSelector/ItemPerPageSelector';

export function PageSelector(): React.ReactElement {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const onChange = (currentPage: number, currentPageSize: number) => {
    setPage(currentPage);
    setPageSize(currentPageSize);
  };

  return (
    <div className="px-6">
      <Pagination
        defaultCurrent={1}
        current={page}
        showSizeChanger
        selectComponentClass={ItemPerPageSelector}
        defaultPageSize={10}
        pageSize={pageSize}
        onChange={onChange}
        total={100}
      />
    </div>
  );
}
