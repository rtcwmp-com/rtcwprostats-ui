import React from "react";
import { Box, Link, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Link as reactLink } from "react-router-dom";

import { ILeaderItem } from "../../../api/types";
import { CATEGORIES } from "../../../constants";
import { unitsToMeters } from "../../../util";

export const LeaderListContent: React.FC<{
  data: ILeaderItem[];
  category: string;
}> = ({ data, category }) => {
  const categoryTitle =
    CATEGORIES.find((item) => item.id === category)?.name || "Value";
  return (
    <Box overflowX="auto" my="10px">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Player</Th>
            <Th isNumeric>{categoryTitle}</Th>
            <Th isNumeric>Games</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data
            .sort((a, b) => {
              return b.value - a.value;
            })
            .filter((leaderItem) => {
              return leaderItem.games >= 16 || leaderItem.games <= 0;
            })
            .map((leaderItem) => (
              <Tr key={leaderItem.guid}>
                <Td>
                  <Link as={reactLink} to={`/player/${leaderItem.guid}`}>
                    <span>{leaderItem.real_name || leaderItem.guid}</span>
                  </Link>
                </Td>
                {/* Player box is 48 units, assuming player hight is 1.8m , convert longest kill units to meters */}
                <Td isNumeric>{category == "Longest Kill" ? unitsToMeters(leaderItem.value) + " m" : leaderItem.value}</Td>
                <Td isNumeric>{leaderItem.games < 0.00001 ? "-" : leaderItem.games}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default LeaderListContent;
