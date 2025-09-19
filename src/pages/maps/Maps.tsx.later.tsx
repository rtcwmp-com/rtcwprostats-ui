import React, { useContext, useState, useMemo } from "react";
import { useQuery } from "react-query";
import { PageTitle } from "../../components/PageTitle";
import {
  Box,
  Grid,
  GridItem,
  Image,
  Text,
  Heading,
  VStack,
  HStack,
  Badge,
  Container,
  SimpleGrid
} from "@chakra-ui/react";
import { MAP_SOURCES } from "../../constants";
import { MAPS_DATA } from "../../constants";
import HeatMap from "../../components/MapWinrates/HeatMap";
import { RegionTypePicker } from "../../components/Nav/RegionTypePicker";
import { RegionTypeContext } from "../../context";
import { Loading } from "../../components/Loading";
import { IMapsAllItem } from "../../api/types";
import { StatsApi } from "../../api";

const getPaceColor = (pace: string) => {
  switch (pace) {
    case "slow": return "blue";
    case "medium": return "yellow";
    case "fast": return "red";
    default: return "gray";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "objective": return "blue";
    case "destroy": return "purple";
    default: return "gray";
  }
};

export const MapsPage: React.FC = () => {
  const rTypeContext = useContext(RegionTypeContext);
  const { region, gametype } = rTypeContext;

  const { isLoading, data } = useQuery<IMapsAllItem[]>([region, gametype], () =>
    StatsApi.Maps.GetAllMapStats(region, gametype)
  );

  return (
    <>
      <PageTitle>Maps</PageTitle>
      <Box w="100%">
        <RegionTypePicker />
      </Box>
      
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center" mb={8}>
            <Heading size="lg" mb={4}>
              RTCW Pro Maps
            </Heading>
            <Text color="gray.500" fontSize="md">
              Explore the various maps available in RTCW Pro. Each map offers unique gameplay experiences 
              with different objectives, team sizes, and difficulty levels.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {MAPS_DATA.map((map) => (
              <Box key={map.id} border="1px" borderColor="gray.200" borderRadius="md" p={4} height="100%">
                <Box pb={2}>
                  <VStack align="start" spacing={2}>
                    <Heading size="md">{map.displayName}</Heading>
                    <HStack spacing={2}>
                      <Badge colorScheme={getTypeColor(map.type)}>
                        {map.type.toUpperCase()}
                      </Badge>
                      <Badge colorScheme={getPaceColor(map.pace)}>
                        {map.pace}
                      </Badge>
                      <Badge variant="outline">
                        {map.players}
                      </Badge>
                    </HStack>
                  </VStack>
                </Box>
                
                <Box pt={0}>
                  <Box mb={4}>
                    <Image
                      src={MAP_SOURCES[map.id as keyof typeof MAP_SOURCES] || ""}
                      alt={map.displayName}
                      borderRadius="md"
                      width="100%"
                      height="200px"
                      objectFit="cover"
                      fallbackSrc="https://via.placeholder.com/300x200?text=Map+Image"
                    />
                  </Box>
                  <Box pt={0}>
                  <Text fontSize="xs" color="gray.200">
                    Map ID: {map.name}
                  </Text>
                </Box>
                  <Text fontSize="sm" color="gray.400" lineHeight="1.6">
                    {map.description}
                  </Text>
                </Box>
                
                
              </Box>
            ))}
          </SimpleGrid>

          <Box mt={8} p={6}>
            <Heading size="md" mb={4}>Player winrates</Heading>
            <Text color="gray.500" fontSize="md">
              Ratio of wins to number of games played.
            </Text>
            {isLoading && <Loading />}
            {data && !("error" in data) && (
              <HeatMap data={data} />
            )}
          </Box>
        </VStack>
      </Container>
    </>
  );
};
