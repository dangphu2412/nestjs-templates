import { Column } from 'react-table';
import { useMemo } from 'react';
import { User } from '../../models/user.type';
import { StatusCell } from '../../components/AdminTable/Cell/StatusCell';
import { UsernameCell } from '../../components/AdminTable/Cell/UsernameCell';
import { MoreActionCell } from '../../components/AdminTable/Cell/MoreActionCell';

export function useAdminColumns(): Column<User>[] {
  return useMemo(
    () => [
      {
        Header: 'Username',
        accessor: 'username',
        Cell: UsernameCell
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Employed At',
        accessor: 'createdAt'
      },
      {
        Header: 'Status',
        accessor: 'deletedAt',
        Cell: StatusCell
      },
      {
        Header: 'Actions',
        Cell: MoreActionCell
      }
    ],
    []
  );
}
