import React, { useContext, MouseEvent } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { Box, Table, Thead, Tbody, Tr, Th, Td ,Text } from "@chakra-ui/react";

import { Loading } from "../Loading";
import { RegionTypeContext } from "../../context";
import { StatsApi } from "../../api";
import { IPlayerStats } from "../../api/types";
import { unixToDate } from "../../util";
import { RTCWColorText } from "../../components/RTCWColorText/RTCWColorText"

export const MatchStatsPlayerTable: React.FC<{
  playerId: string;
}> = ({ playerId }) => {
  const history = useHistory();
  const rTypeContext = useContext(RegionTypeContext);
  const { region, gametype } = rTypeContext; //region: 'na', gametype: '6'

  const { data, isLoading } = useQuery<IPlayerStats[]>(
    ["stats", playerId, region, gametype],
    () => StatsApi.Players.Stats(playerId, region, gametype)
  );

  const fetchMatchDetails = (e: MouseEvent) => {
    const matchId = e.currentTarget.getAttribute("data-match-id");
    history.push(`/matches/${matchId}`);
  };

  const getKDR = (item: IPlayerStats) => {
     let deaths = item["categories"].deaths;
     deaths = deaths == 0 ? 1 : deaths;
     const kdr = (item["categories"].kills / deaths)
     return kdr;
  };

  const getKDRcolor = (kdr: number) => {
    return kdr < 1 ? "red.500" : "green.500";
  };

  return (
    <Box w="100%" overflowX="auto">
      {isLoading && <Loading />}
      {data && data.length > 0 ? (
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th>Alias</Th>
              <Th>Match ID</Th>
              <Th>Date</Th>
              <Th>K/D</Th>
              <Th>Ratio</Th>
              <Th># Rnds</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr
                key={item.match_id}
                cursor="pointer"
                onClick={fetchMatchDetails}
                data-match-id={item.match_id}
              >
                <Td><RTCWColorText coloredString={item.alias_colored == null ? item.alias : item.alias_colored}/></Td>
                <Td>
                  <span>{item.match_id}</span>
                </Td>
                <Td><span>{unixToDate(item.match_id).toLocaleString(
                      [],
                      {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}</span></Td>
                <Td>{ item["categories"].kills + "/" + item["categories"].deaths }</Td>
                <Td>{ <Text color={getKDRcolor(getKDR(item))}>{getKDR(item).toFixed(1)}</Text> } </Td>
                <Td>{item.num_rounds}</Td>
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
