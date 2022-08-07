import React from 'react';
import { Column } from 'react-table';
import { User } from '../../models/user.type';

export function useAdminColumns() {
  return React.useMemo<Column<User>[]>(
    () => [
      {
        Header: 'Username',
        accessor: 'username'
      },
      {
        Header: 'Status',
        accessor: 'status'
      }
    ],
    []
  );
}
