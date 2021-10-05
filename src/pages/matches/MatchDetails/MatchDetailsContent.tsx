import React from "react";

import { TeamOverview } from "../../../components/TeamOverview/TeamOverview";
import { ITeamOverviewData } from "../../../api/types";
import styles from "./MatchDetailsContent.module.css";

export const MatchDetailsContent = ({
  data,
  map,
  matchId,
}: {
  data: ITeamOverviewData | null;
  map: string;
  matchId: string;
}) => {
  if (!data) return <p>There was an error fetching match data.</p>;
  return (
    <>
      <div className={styles.subHeader}>
        <span className={styles.matchId}>{map}</span>
        <span className={styles.matchId}>{matchId}</span>
      </div>
      <TeamOverview map={map} data={data} />
    </>
  );
};
