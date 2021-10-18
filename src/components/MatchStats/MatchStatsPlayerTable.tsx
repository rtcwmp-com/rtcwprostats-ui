import React, { useContext, MouseEvent } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

import { Loading } from "../Loading";
import { RegionTypeContext } from "../../context";
import { StatsApi } from "../../api";
import { IPlayerStats } from "../../api/types";

export const MatchStatsPlayerTable: React.FC<{
  playerId: string;
}> = ({ playerId }) => {
  const history = useHistory();
  const rTypeContext = useContext(RegionTypeContext);
  const { region, gametype } = rTypeContext; //region: 'na', gametype: '6'

  const { data, isLoading } = useQuery<IPlayerStats[]>(
    ["stats", playerId],
    () => StatsApi.Players.Stats(playerId)
  );

  const matchData = data?.filter(
    (item) => item.type === `${region}#${gametype}`
  );

  const fetchMatchDetails = (e: MouseEvent) => {
    const matchId = e.currentTarget.getAttribute("data-match-id");
    history.push(`/matches/${matchId}`);
  };

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
              <Tr
                key={item.match_id}
                cursor="pointer"
                onClick={fetchMatchDetails}
                data-match-id={item.match_id}
              >
                <Td>{item.alias}</Td>
                <Td>
                  <span>{item.match_id}</span>
                </Td>
                <Td isNumeric>{item.team}</Td>
                <Td isNumeric>{item.num_rounds}</Td>
              </Tr>
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
