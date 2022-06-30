import React from "react";
import { Link as reactLink } from "react-router-dom";
import {
  Box,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { MatchHealth } from "../MatchHealth";
import MapChart from "../MatchHealth/MapChart"
import HourChart from "../MatchHealth/HourChart"
import DayChart from "../MatchHealth/DayChart"
import { IMatchHealthResponse } from "../../api/types";
import { REGIONS, GAME_TYPES } from "../../constants";

const HealthStats: React.FC< { data: IMatchHealthResponse, region: string, gametype: string}> = ({data, region, gametype}) => {
  const currentMatches = data.current;
  const lastMonthMatches = data.last_month;
  const lastYearMonthMatches = data.last_year_month;
  const currentMaps = data.current_maps;

  const limitFromAPI = 600;
  const currentMatchesLen = Object.keys(currentMatches).length;
  const lastMonthMatchesLen = Object.keys(lastMonthMatches).length;
  let lastYearMonthMatchesLen = Object.keys(lastYearMonthMatches).length;

  const regionTitle = REGIONS.find((item) => item.id === region)?.name;
  const gameTypeTitle = GAME_TYPES.find((item) => item.id === gametype)?.name;

  return (
      <Box my="10px">
        <Box w="100%">
          <Heading as="h4" size="md" mb="10px">
            {`Match metrics - ${regionTitle} ${gameTypeTitle}`}
          </Heading>
          <SimpleGrid columns={[2, 2, 3]} spacing={10}>
            <Stat>
              <StatLabel>Current Period</StatLabel>
              <StatNumber>{currentMatchesLen > limitFromAPI ? limitFromAPI.toString() + "+" : currentMatchesLen}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Last Month</StatLabel>
              <StatNumber>{lastMonthMatchesLen > limitFromAPI ? limitFromAPI.toString() + "+" : lastMonthMatchesLen}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Last Year this Month</StatLabel>
              <StatNumber>{lastYearMonthMatchesLen > limitFromAPI ? limitFromAPI.toString() + "+" : lastYearMonthMatchesLen}</StatNumber>
            </Stat>
          </SimpleGrid>
        </Box>
        <br />
        <Heading as="h6" size="md" mb="10px">
            {`Matches over time - ${regionTitle} ${gameTypeTitle}`}
          </Heading>
        <Box w="100%">
          <MatchHealth data={data} />
        </Box>
        <Box w="100%">
            <Heading as="h4" size="md" mb="10px">
                {`Last 28 days metrics`}
            </Heading>
        </Box>
        <SimpleGrid columns={[2, 2, 3]} spacing={10}>
          <Box w="100%">
            <Heading as="h4" size="md" mb="10px">
                {`Current maps`}
            </Heading>
            <Box w="100%">
              <MapChart data={data} />
            </Box>
          </Box>
          <Box w="100%">
            <Heading as="h4" size="md" mb="10px">
                {`Match start hours distribution`}
            </Heading>
            <Box w="100%">
              <HourChart data={data} />
            </Box> 
          </Box>
          <Box w="100%">
            <Heading as="h4" size="md" mb="10px">
                {`Days of week distribution`}
            </Heading>
            <Box w="100%">
              <DayChart data={data} />
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
  );
};

export default HealthStats;
