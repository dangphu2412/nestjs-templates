import React from 'react';
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { useTable } from 'react-table';
import { Box } from '../../modules/shared/components/Box';
import { useQueryUsers } from '../../modules/user/hooks/data/useQueryUsers';
import { useAdminColumns } from '../../modules/user/hooks/table/useAdminColumns.hook';

export default function AdministratorPage(): React.ReactElement {
  const { data } = useQueryUsers();
  const columns = useAdminColumns();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: data ?? [] });

  return (
    <Box>
      <Text fontSize="lg" fontWeight="semibold" padding="1rem">
        Administrator management
      </Text>

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
    </Box>
  );
}
