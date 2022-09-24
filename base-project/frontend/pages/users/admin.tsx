import React from 'react';
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
import { useTable } from 'react-table';
import { useQueryUsers } from '@modules/user/hooks/data/useQueryUsers';
import { useAdminColumns } from '@modules/user/hooks/table/useAdminColumns.hook';
import { PaginationContainer } from '@modules/user/components/AdminTable/PaginationContainer/PaginationContainer';
import { TableHeaderContainer } from '@modules/user/components/AdminTable/TableHeader/TableHeaderContainer';
import { AdminContainer } from '@modules/user/containers/AdminContainer/AdminContainer';
import { FilterBar } from '@modules/user/components/AdminTable/FilterBar/FilterBar';
import { FullLoader } from '@modules/shared/components/Loader/Full/FullLoader';

export default function AdministratorPage(): React.ReactElement {
  const { data, isLoading } = useQueryUsers();
  const columns = useAdminColumns();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: data ?? [] });

  return (
    <AdminContainer>
      <FullLoader isLoading={isLoading} />

      <div className="px-6">
        <TableHeaderContainer />
        <FilterBar />
        <PaginationContainer />
      </div>

      <TableContainer>
        <Table variant="simple" {...getTableProps()}>
          <TableCaption>Manage admin users</TableCaption>

          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </AdminContainer>
  );
}
