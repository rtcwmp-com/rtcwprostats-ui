import React from "react";
import { IFeud } from "../../api/types";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Text
} from '@chakra-ui/react'
import { MdHelp } from "react-icons/md";

export const FeudsDisplay: React.FC<{ feuds: IFeud[] }> = ({ feuds }) => {
  return (
    <>
      <Text mt={5} fontSize="2xl">
        Top Feuds
      </Text>
      <Table variant='striped' size="sm" width="400px">
        <TableCaption>The most numerous head-to-head encounters of the match</TableCaption>
        <Thead>
          <Tr>
            <Th>PlayerA</Th>
            <Th >Kills</Th>
            <Th isNumeric>Kills</Th>
            <Th >PlayerB</Th>
          </Tr>
        </Thead>
        <Tbody>
          {feuds.map((feud, idx) => (
              <Tr key={idx} px={2} backgroundColor="rgba(0, 0, 0, 0.15)" w="100%">
                  <Td>
                    {feud[0]}
                  </Td>
                  <Td fontWeight="bold" >
                    {feud[2]}
                  </Td>
                  <Td isNumeric fontWeight="bold" >
                    {feud[3]}
                  </Td>
                  <Td>
                    {feud[1]}
                  </Td>
              </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};
