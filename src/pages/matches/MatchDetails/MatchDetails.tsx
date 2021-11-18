import React from "react";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { StatsApi } from "../../../api";
import {
  IPlayerStatsWithId,
  IStatsResponse,
  ITeamOverviewData,
} from "../../../api/types";
import { Loading } from "../../../components/Loading";
import { MatchDetailsContent } from "./MatchDetailsContent";
import { PageTitle } from "../../../components/PageTitle";
import { MatchStats } from "../../../components/MatchStats";

export const MatchDetails: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const { groupId } = useParams<{ groupId: string }>();

  const statsParam = matchId ? matchId : groupId;
  const statsParamType = matchId ? "Match" : "Group";
  const groupFlag = matchId ? false : true;

  const reportDescription = statsParamType + ": " + statsParam;

  const { data, isLoading } = useQuery<IStatsResponse>(
    ["match-stats", statsParam],
    () => StatsApi.Matches.MatchStats(statsParam, groupFlag)
  );

  const actualData = useMemo(() => {
    if (!data) {
      return null;
    }

    return data.statsall.reduce(
      (acc, item) => {
        const playerId = Object.keys(item)[0];
        const player: IPlayerStatsWithId = {
          ...item[playerId],
          playerId,
        };
        const gametype = parseInt(data.type.split("#")[0]);
        const displayLimit = gametype === 3 ? 7 : 15;
        const displayAllTeams = data.statsall.length < displayLimit;

        if (displayAllTeams) {
          if (player.team === "Allied" || player.team === "TeamA") {
            acc.a.push(player);
          } else {
            acc.b.push(player);
          }
        } else {
          acc.a.push(player);
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
          <MatchDetailsContent
            data={actualData}
            matchSummary={data.match_summary}
            reportDescription={reportDescription}
          />
          {actualData && (
            <MatchStats
              data={actualData}
              displayHeader={actualData.b.length > 0}
            />
          )}
        </>
      )}
    </>
  );
};
