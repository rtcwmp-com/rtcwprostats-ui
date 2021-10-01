import React from "react";
import { useQuery } from "react-query";
import { PageTitle } from "../../../components/PageTitle";
import { StatsApi } from "../../../api";
import { IPlayerDetails } from "../../../api/types";

export const PlayerList: React.FC = () => {
  // const { isLoading, data } = useQuery<IPlayerDetails[]>(
  //   ["players-recent-thirty"],
  //   StatsApi.Players.RecentThirty
  // );

  // console.log(isLoading, data);

  return (
    <>
      <PageTitle>Players</PageTitle>
    </>
  );
};
