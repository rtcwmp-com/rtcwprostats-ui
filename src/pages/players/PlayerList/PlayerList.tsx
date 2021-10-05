import React from "react";
import { useQuery } from "react-query";
import { Loading } from "../../../components/Loading";
import { PageTitle } from "../../../components/PageTitle";
import { RecentPlayerTable } from "../../../components/RecentPlayerTable";
import { StatsApi } from "../../../api";
import { IRecentPlayer } from "../../../api/types";
import { LAST_RECENT_PLAYERS_NUM } from "../../../constants";

export const PlayerList: React.FC = () => {
  const { isLoading, data } = useQuery<IRecentPlayer[]>(
    ["players-recent-thirty"],
    () => StatsApi.Players.RecentPlayers(LAST_RECENT_PLAYERS_NUM)
  );

  return (
    <>
      <PageTitle>Recent Players</PageTitle>
      {isLoading && <Loading />}
      {data && <RecentPlayerTable data={data} />}
    </>
  );
};
