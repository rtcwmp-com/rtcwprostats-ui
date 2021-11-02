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
  Text
} from "@chakra-ui/react";
import { Link as reactLink } from "react-router-dom";
import { formatDistance } from "date-fns";
import { RegionTypeContext } from "../../../context";
import { dateStringToDate } from "../../../util";
import { IGroupResponse } from "../../../api/types";

import { REGIONS, GAME_TYPES } from "../../../constants";

export const GroupListContent: React.FC<{ data: IGroupResponse }> = ({ data }) => {
  const rTypeContext = useContext(RegionTypeContext);
  const { region, gametype } = rTypeContext; //region: 'na', gametype: '6'
  const regionTitle = REGIONS.find((item) => item.id === region)?.longName;
  const gameTypeTitle = GAME_TYPES.find((item) => item.id === gametype)?.name;
  return (
    <Box overflowX="auto" my="10px">
      <Table variant="simple">
        <TableCaption>{`${regionTitle} - ${gameTypeTitle} - Recent match groups`}</TableCaption>
        <Thead>
          <Tr>
            <Th>Group Name</Th>
            <Th>Processed</Th>
            <Th>Teams</Th>
            <Th>Games</Th>
            <Th>Game Length</Th>
            <Th>Finished</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(data)
            .map((group) => (
              <Tr key={group}>
                <Td>
                  <Link
                    as={reactLink}
                    to={`/groups/${group}`}
                  >
                    {group}
                  </Link>
                </Td>
                <Td>
                  {data[group].cached}
                </Td>
                <Td>
                  <span>{ data[group].cached == "Yes" ? data[group].teams.split(";")[0] : "" }</span>
                  <br/>
                  <span>{ data[group].cached == "Yes" ? data[group].teams.split(";")[1] : "" }</span>
                </Td>
                <Td>
                  {data[group].games}
                </Td>
                <Td>
                  { data[group].cached == "Yes" ? data[group].duration_nice : "" }
                </Td>
                <Td>
                  { data[group].cached == "Yes" ?
                      `${formatDistance(
                        dateStringToDate(data[group].finish_human),
                        new Date())} ago` 
                        : ""
                  }{" "}
                  <Text color="gray.500" fontSize="xs">
                    {dateStringToDate(data[group].finish_human).toLocaleString(
                      [],
                      {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </Text>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};
