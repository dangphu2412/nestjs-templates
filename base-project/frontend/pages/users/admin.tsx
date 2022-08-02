import React from 'react';
import {
  Table,
  TableCaption,
  TableContainer,
  Text,
  Tr,
  Thead,
  Th,
  Tbody,
  Td,
  Tfoot
} from '@chakra-ui/react';
import { Box } from '../../modules/shared/components/Box';

export default function AdministratorPage(): React.ReactElement {
  return (
    <Box>
      <Text fontSize="lg" fontWeight="semibold" padding="1rem">
        Administrator management
      </Text>

      <TableContainer>
        <Table variant="simple">
          <TableCaption>Manage admin users</TableCaption>
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Status</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
}
