import React from "react";
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
import HeatMap from "../../components/MapWinrates/HeatMap";

interface MapInfo {
  id: string;
  name: string;
  displayName: string;
  description: string;
  type: "objective" | "destroy";
  players: string;
  pace: "slow" | "medium" | "fast";
}

const MAPS_DATA: MapInfo[] = [
  {
    id: "mp_beach",
    name: "mp_beach",
    displayName: "Beach",
    description: "A coastal assault map featuring a beach landing with bunkers and coastal defenses. Players must navigate the shoreline while avoiding enemy fire from fortified positions.",
    type: "objective",
    players: "6v6",
    pace: "medium"
  },
  {
    id: "mp_ice",
    name: "mp_ice",
    displayName: "Ice",
    description: "A frozen landscape with ice caves and snow-covered terrain. The map features tight corridors and open areas with limited visibility due to snow conditions.",
    type: "objective",
    players: "6v6",
    pace: "slow"
  },
  {
    id: "mp_sub",
    name: "mp_sub",
    displayName: "Submarine",
    description: "A submarine base map with tight corridors and multiple levels. Players navigate through the submarine's interior with limited space and strategic chokepoints.",
    type: "destroy",
    players: "6v6",
    pace: "fast"
  },
  {
    id: "te_frostbite",
    name: "te_frostbite",
    displayName: "Frostbite",
    description: "A team elimination map set in an arctic environment. Features open areas and cover points for tactical team-based combat.",
    type: "objective",
    players: "3v3",
    pace: "fast"
  },
  {
    id: "te_ufo",
    name: "te_ufo",
    displayName: "UFO",
    description: "A unique team elimination map with alien architecture and technology. Features multiple levels and strategic positions for team combat.",
    type: "objective",
    players: "6v6",
    pace: "slow"
  }
];

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
  return (
    <>
      <PageTitle>Maps</PageTitle>
      
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
            <HeatMap data={[]} />  
          </Box>
        </VStack>
      </Container>
    </>
  );
}; 