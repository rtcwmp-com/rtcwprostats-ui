import React, { useContext } from "react";
import { useQuery } from "react-query";
import {
  Box,
  LinkBox,
  LinkOverlay,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { Link as reactLink } from "react-router-dom";

import { Loading } from "../Loading";
import { RegionTypeContext } from "../../context";
import { StatsApi } from "../../api";
import { IPlayerStats } from "../../api/types";

export const MatchStatsPlayerTable: React.FC<{
  playerId: string;
}> = ({ playerId }) => {
  const rTypeContext = useContext(RegionTypeContext);
  const { region, gametype } = rTypeContext; //region: 'na', gametype: '6'

  const { data, isLoading } = useQuery<IPlayerStats[]>(
    ["stats", playerId],
    () => StatsApi.Players.Stats(playerId)
  );

  const matchData = data?.filter(
    (item) => item.type === `${region}#${gametype}`
  );

  return (
    <Box w="100%" overflowX="auto">
      {isLoading && <Loading />}
      {matchData && matchData.length > 0 ? (
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th>Alias</Th>
              <Th>Match ID</Th>
              <Th>Team</Th>
              <Th># Rnds</Th>
            </Tr>
          </Thead>
          <Tbody>
            {matchData.map((item) => (
              <LinkBox as="tr" key={item.match_id}>
                <Td>{item.alias}</Td>
                <Td>
                  <LinkOverlay
                    as={reactLink}
                    to={`/matches/${item.match_id}/unknown`}
                  >
                    <span>{item.match_id}</span>
                  </LinkOverlay>
                </Td>
                <Td isNumeric>{item.team}</Td>
                <Td isNumeric>{item.num_rounds}</Td>
              </LinkBox>
            ))}
          </Tbody>
        </Table>
      ) : (
        "Unavailable"
      )}
    </Box>
  );
};

export default MatchStatsPlayerTable;
