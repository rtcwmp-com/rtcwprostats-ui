import React from "react";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { StatsApi } from "../../../api";
import { IStatsResponse, ITeamOverviewData } from "../../../api/types";
import { PageTitle } from "../../../components/PageTitle";
import { TeamOverview } from "../../../components/TeamOverview/TeamOverview";
import styles from "./MatchDetails.module.css";

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

  if (isLoading) {
    return (
      <>
        <PageTitle>Match Report</PageTitle>
        <span className={styles.matchId}>{matchId}</span>
        <div>Loading...</div>
      </>
    );
  }

  if (actualData) {
    return (
      <>
        <PageTitle>Match Report</PageTitle>
        <div className={styles.subHeader}>
          <span className={styles.matchId}>{map}</span>
          <span className={styles.matchId}>{matchId}</span>
        </div>
        <TeamOverview map={map} data={actualData} />
      </>
    );
  }

  return (
    <>
      <PageTitle>Match Report</PageTitle>
      <span className={styles.matchId}>{matchId}</span>
      <div>Error while fetching match details</div>
    </>
  );
};
