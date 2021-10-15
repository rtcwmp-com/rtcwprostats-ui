import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/layout";
import { Loading } from "../../../components/Loading";
import { PageTitle } from "../../../components/PageTitle";
import { PlayerStats } from "../../../components/PlayerStats";
import { RegionTypePicker } from "../../../components/Nav/RegionTypePicker";
import { StatsApi } from "../../../api";
import { IPlayerDetails } from "../../../api/types";
import { PlayerAliasesPopover } from "../../../components/PlayerAliases";

export const Player: React.FC = () => {
  const { playerId } = useParams<{ playerId: string }>();

  const { data, isLoading } = useQuery<IPlayerDetails>(
    ["players", playerId],
    () => StatsApi.Players.ById(playerId)
  );

  return (
    <>
      <PageTitle>
        {data?.real_name ? data.real_name : "Player"}
        <PlayerAliasesPopover playerId={playerId} />
      </PageTitle>
      <Box w="100%">
        <RegionTypePicker />
      </Box>
      {isLoading && <Loading />}
      {data && <PlayerStats data={data} playerId={playerId} />}
    </>
  );
};
