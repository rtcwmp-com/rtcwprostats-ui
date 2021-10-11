import React, { useContext } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { RegionTypeContext } from "../../context";

import { IPlayerDetails } from "../../api/types";
import { REGIONS, GAME_TYPES, STAT_KEYS } from "../../constants";

const PlayerWrapper: React.FC<{ data: IPlayerDetails }> = ({ data }) => {
  const rTypeContext = useContext(RegionTypeContext);
  const { region, gametype } = rTypeContext; //region: 'na', gametype: '6'
  const regionKey = `${region}#${gametype}`;

  const { elos = {}, aggstats = {}, kdr = {} } = data;
  const { [regionKey]: eloRegion } = elos;
  const { [regionKey]: aggStatsRegion } = aggstats;
  const { [regionKey]: kdrRegion } = kdr;

  const regionTitle = REGIONS.find((item) => item.id === region)?.longName;
  const gameTypeTitle = GAME_TYPES.find((item) => item.id === gametype)?.name;

  console.log(data);

  // TODO: Need to figure out how/what to actually display
  return (
    <Box my="10px">
      <Stack direction={["column", "row"]} w="100%">
        <Box w={["100%", "400px"]} p="10px" rounded={{ md: "lg" }}>
          <Heading as="h5" size="sm" mb="10px">
            {`Lifetime - ${regionTitle} ${gameTypeTitle}`}
          </Heading>
          <SimpleGrid columns={2} spacing={10}>
            <Stat>
              <StatLabel>ELO</StatLabel>
              <StatNumber>{(eloRegion && eloRegion.elo) || "N/A"}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Games</StatLabel>
              <StatNumber>
                {(aggStatsRegion && aggStatsRegion["games"]) || "N/A"}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>KDR</StatLabel>
              <StatNumber>{(kdrRegion && kdrRegion) || "N/A"}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Accuracy</StatLabel>
              <StatNumber>
                {(aggStatsRegion &&
                  aggStatsRegion["accuracy"] &&
                  `${aggStatsRegion["accuracy"] / 100}%`) ||
                  "N/A"}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Headshots</StatLabel>
              <StatNumber>
                {(aggStatsRegion && aggStatsRegion["headshots"]) || "N/A"}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Objectives Captured</StatLabel>
              <StatNumber>
                {(aggStatsRegion && aggStatsRegion["obj_captured"]) || "N/A"}
              </StatNumber>
            </Stat>
          </SimpleGrid>
        </Box>
        <Box w={["100%"]} p="10px" rounded={{ md: "lg" }}>
          {/* {aggStatsRegion &&
            Object.keys(aggStatsRegion).map((item) => {
              const keyName = STAT_KEYS[item];
              const val = aggStatsRegion[item];
              return <p key={item}>{`${keyName}: ${val}`}</p>;
            })} */}
        </Box>
      </Stack>
    </Box>
  );
};

export default PlayerWrapper;
