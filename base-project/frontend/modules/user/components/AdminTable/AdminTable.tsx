import { ReactElement } from 'react';
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { useAdminColumns } from '@/modules/user/hooks/table/useAdminColumns';
import { useTable } from 'react-table';
import { UserManagementView } from '@/modules/user/models/user.type';
import { Page } from '@/modules/shared/clients';

type Props = {
  data: Page<UserManagementView> | undefined;
};

export function AdminTable({ data }: Props): ReactElement {
  const columns = useAdminColumns();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: data?.items ?? [] });

  return (
    <TableContainer>
      <Table variant="simple" {...getTableProps()}>
        <TableCaption>Manage admin users</TableCaption>

        <Thead>
          {headerGroups.map(headerGroup => {
            const { key: headerKey, ...headerRowProps } =
              headerGroup.getHeaderGroupProps();

            return (
              <Tr key={headerKey} {...headerRowProps}>
                {headerGroup.headers.map(column => {
                  const { key: headerGroupKey, ...colProps } =
                    column.getHeaderProps();

                  return (
                    <Th key={headerGroupKey} {...colProps}>
                      {column.render('Header')}
                    </Th>
                  );
                })}
              </Tr>
            );
          })}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);

            const { key: rowKey, ...rowProps } = row.getRowProps();

            return (
              <Tr key={rowKey} {...rowProps}>
                {row.cells.map(cell => {
                  const { key: keyCell, ...cellProps } = cell.getCellProps({
                    key: `cell_${cell.column.id}_${cell.row.original.id}`
                  });

                  return (
                    <Td key={keyCell} {...cellProps}>
                      {cell.render('Cell')}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
