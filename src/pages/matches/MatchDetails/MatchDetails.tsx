import React from "react";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { StatsApi } from "../../../api";
import { IStatsResponse, ITeamOverviewData } from "../../../api/types";
import { Loading } from "../../../components/Loading";
import { MatchDetailsContent } from "./MatchDetailsContent";
import { PageTitle } from "../../../components/PageTitle";

export const MatchDetails: React.FC = () => {
  const { matchId, map } = useParams<{ matchId: string; map: string }>();
  const { data, isLoading } = useQuery<IStatsResponse>(
    ["match-stats", matchId],
    () => StatsApi.Matches.MatchStats(matchId)
  );

  const actualData = useMemo(() => {
    if (!data) {
      return null;
    }

    return data.statsall.reduce(
      (acc, item) => {
        const player = item[Object.keys(item)[0]];

        if (player.team === "Allied") {
          acc.a.push(player);
        } else {
          acc.b.push(player);
        }

        return acc;
      },
      { a: [], b: [] } as ITeamOverviewData
    );
  }, [data]);

  return (
    <>
      <PageTitle>Match Report</PageTitle>
      {isLoading && <Loading />}
      {data && (
        <MatchDetailsContent data={actualData} map={map} matchId={matchId} />
      )}
    </>
  );
};
