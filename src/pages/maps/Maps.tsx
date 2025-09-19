import React, { useContext, useState, useMemo } from "react";
import { useQuery } from "react-query";
import { PageTitle } from "../../components/PageTitle";
import {
  Box,
  List,
  ListItem,
  ListIcon
} from "@chakra-ui/react";
import { MdCheckCircle, MdInfo, MdTrendingUp } from 'react-icons/md';
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
      <PageTitle>Map Stats</PageTitle>

      <List p={4}>
        <ListItem>
          - Win ratio calculated as: wins/games played
        </ListItem>
        <ListItem>
          - Player statistic requires minimum 8 games on a given map
        </ListItem>
        <ListItem>
          - Draws are omitted, so win rates on average will be less than 50%.
        </ListItem>
        <ListItem>
          - Map stats had been backdated to only Feb 2024.
        </ListItem>
      </List>

      <Box w="100%">
        <RegionTypePicker />
      </Box>
      
      <Box mt={2} p={6}>
        {isLoading && <Loading />}
        {data && !("error" in data) && (
          <HeatMap data={data} />
        )}
      </Box>
    </>
  );
};

