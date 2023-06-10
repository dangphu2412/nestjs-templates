import { CellProps, Column } from 'react-table';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { PaidCell } from '@/modules/user/components/AdminTable/Cell/PaidCell';
import { UserManagementView } from '../../models/user.type';
import { StatusCell } from '../../components/AdminTable/Cell/StatusCell';
import { UsernameCell } from '../../components/AdminTable/Cell/UsernameCell';
import { MoreActionCell } from '../../components/AdminTable/Cell/MoreActionCell';
import { useRouter } from 'next/router';
import { RoleCell } from '@/modules/user/components/AdminTable/Cell/RoleCell';

export function useAdminColumns(): Column<UserManagementView>[] {
  const { push } = useRouter();

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
        accessor: row => format(new Date(row.createdAt), 'dd/MM/yyyy')
      },
      {
        Header: 'Paid',
        Cell: PaidCell
      },
      {
        Header: 'Roles',
        accessor: 'roles',
        Cell: RoleCell
      },
      {
        Header: 'Status',
        accessor: 'deletedAt',
        Cell: StatusCell
      },
      {
        Header: 'Actions',
        Cell: (props: CellProps<UserManagementView, string>) => (
          <MoreActionCell {...props} push={push} />
        )
      }
    ],
    [push]
  );
}
