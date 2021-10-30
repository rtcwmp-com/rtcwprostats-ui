import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Link,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
} from "@chakra-ui/react";
import { Link as reactLink } from "react-router-dom";
import { formatDistance } from "date-fns";
import { RegionTypeContext } from "../../../context";
import { dateStringToDate } from "../../../util";
import { IMatch } from "../../../api/types";

import { REGIONS, GAME_TYPES } from "../../../constants";
import { MatchListContentModal } from "./MatchListModal";

interface IMatchCheckbox {
  id: string;
  status: boolean;
}

export const MatchListContent: React.FC<{ data: IMatch[] }> = ({ data }) => {
  const [checkboxes, setCheckBoxes] = React.useState<IMatchCheckbox[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const rTypeContext = useContext(RegionTypeContext);
  const { region, gametype } = rTypeContext; //region: 'na', gametype: '6'
  const regionTitle = REGIONS.find((item) => item.id === region)?.longName;
  const gameTypeTitle = GAME_TYPES.find((item) => item.id === gametype)?.name;

  let modalKey: number = Math.random() * 100;

  const onCheckBoxChange = (id: string) => {
    const cbs = checkboxes.filter((item) => item.id === id);
    if (cbs.length) {
      setCheckBoxes(
        checkboxes.map((item) =>
          item.id == id ? { ...item, status: !item.status } : item
        )
      );
    } else {
      setCheckBoxes([...checkboxes, { id, status: true }]);
    }
  };

  const onCreateGroupClick = () => {
    setIsModalOpen(true);
  };

  const handleModalOnClose = (reset: boolean = false) => {
    if (reset) {
      setCheckBoxes([]);
      modalKey++;
    }
    setIsModalOpen(false);
  };

  return (
    <Box overflowX="auto" my="10px">
      <Table variant="simple">
        <TableCaption>{`${regionTitle} - ${gameTypeTitle} - Recent Matches`}</TableCaption>
        <Thead>
          <Tr>
            <Th>Server Name</Th>
            <Th>Match ID</Th>
            <Th>Map</Th>
            <Th>Started</Th>
            <Th>Teams</Th>
            <Th isNumeric={true}>
              <Button size="xs" onClick={onCreateGroupClick}>
                Create group
              </Button>
              <MatchListContentModal
                key={`modal-${modalKey}`}
                matches={checkboxes.filter((item) => item.status).flatMap((item) => parseInt(item.id))}
                region={region}
                gametype={gametype}
                isOpen={isModalOpen}
                handleModalOnClose={handleModalOnClose}
              />
            </Th>
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
            .map((match, idx) => (
              <Tr key={match.match_id}>
                <Td>
                  <Link as={reactLink} to={`/matches/${match.match_id}`}>
                    {match.server_name}
                  </Link>
                </Td>
                <Td>
                  <Link as={reactLink} to={`/matches/${match.match_id}`}>
                    {match.match_id}
                  </Link>
                </Td>
                <Td>
                  <Link as={reactLink} to={`/matches/${match.match_id}`}>
                    {match.map}
                  </Link>
                </Td>
                <Td>
                  {formatDistance(
                    dateStringToDate(match.date_time_human),
                    new Date()
                  )}{" "}
                  ago
                  <br />
                  <Text color="gray.500" fontSize="xs">
                    {dateStringToDate(match.date_time_human).toLocaleString(
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
                <Td>
                    <span>{ match.teams ? match.teams.split(";")[0] : "" }</span>
                    <br/>
                    <span>{ match.teams ? match.teams.split(";")[1] : "" }</span>
                </Td>
                <Td isNumeric={true}>
                  <Checkbox
                    size="lg"
                    colorScheme="gray"
                    onChange={() => onCheckBoxChange(match.match_id)}
                    isChecked={
                      checkboxes.filter((item) => item.id === match.match_id)[0]
                        ?.status || false
                    }
                  />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};
