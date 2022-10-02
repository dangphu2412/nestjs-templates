import React from 'react';
import { Paginator } from '@modules/shared/components/Pagination/Paginator';
import { useDispatch } from 'react-redux';
import { userActions } from '@modules/user/store/user.slice';

export function PaginationContainer(): React.ReactElement {
  const dispatch = useDispatch();

  function handlePaginationChange(
    currentPage: number,
    currentPageSize: number
  ) {
    dispatch(
      userActions.setPagination({
        page: currentPage,
        size: currentPageSize
      })
    );
  }

  return (
    <Paginator
      className="py-2"
      totalPage={100}
      onPaginationChange={handlePaginationChange}
    />
  );
}
