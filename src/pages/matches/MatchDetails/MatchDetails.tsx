import React from "react";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { StatsApi } from "../../../api";
import { IStatsResponse, ITeamOverviewData } from "../../../api/types";
import { Loading } from "../../../components/Loading";
import { MatchDetailsContent } from "./MatchDetailsContent";
import { PageTitle } from "../../../components/PageTitle";
import { MatchStats } from "../../../components/MatchStats";

export const MatchDetails: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const { groupId } = useParams<{ groupId: string }>();

  const statsParam = matchId ? matchId : groupId;
  const groupFlag = matchId ? false : true;

  const { data, isLoading } = useQuery<IStatsResponse>(
    ["match-stats", statsParam],
    () => StatsApi.Matches.MatchStats(statsParam, groupFlag)
  );
  
  let map = "unknown";
  if (data && "match_summary" in data) {
    map = data?.match_summary.results[Object.keys(data.match_summary.results)[0]].map;
  }

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
      {data && !("error" in data) && (
        <>
          <MatchDetailsContent data={actualData} map={map} matchId={matchId} />
          <MatchStats data={actualData} />
        </>
      )}
    </>
  );
};
