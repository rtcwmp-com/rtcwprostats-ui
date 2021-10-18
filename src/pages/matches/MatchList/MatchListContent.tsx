import React, { useContext } from "react";
import {
  Box,
  Link,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { Link as reactLink } from "react-router-dom";
import { formatDistance } from "date-fns";
import { RegionTypeContext } from "../../../context";
import { dateStringToDate } from "../../../util";
import { IMatch } from "../../../api/types";

import { REGIONS, GAME_TYPES } from "../../../constants";

export const MatchListContent: React.FC<{ data: IMatch[] }> = ({ data }) => {
  const rTypeContext = useContext(RegionTypeContext);
  const { region, gametype } = rTypeContext; //region: 'na', gametype: '6'
  const regionTitle = REGIONS.find((item) => item.id === region)?.longName;
  const gameTypeTitle = GAME_TYPES.find((item) => item.id === gametype)?.name;
  return (
    <Box overflowX="auto" my="10px">
      <Table variant="simple">
        <TableCaption>{`${regionTitle} - ${gameTypeTitle} - Recent Matches`}</TableCaption>
        <Thead>
          <Tr>
            <Th>Map</Th>
            <Th>Server Name</Th>
            <Th>Active</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data
            .filter(
              (item, idx, arr) =>
                arr.findIndex(
                  (idxItem) => idxItem.match_id === item.match_id
                ) === idx
            )
            .map((match) => (
              <Tr key={match.match_id}>
                <Td>
                  <Link
                    as={reactLink}
                    to={`/matches/${match.match_id}`}
                  >
                    {match.map}
                  </Link>
                </Td>
                <Td>
                  <Link
                    as={reactLink}
                    to={`/matches/${match.match_id}`}
                  >
                    {match.server_name}
                  </Link>
                </Td>
                <Td>
                  {formatDistance(
                    dateStringToDate(match.date_time_human),
                    new Date()
                  )}{" "}
                  ago
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};
