import React from "react";

import { TeamOverview } from "../../../components/TeamOverview/TeamOverview";
import { ITeamOverviewData, iMatchSummary } from "../../../api/types";
import styles from "./MatchDetailsContent.module.css";

export const MatchDetailsContent = ({
  data,
  matchSummary
}: {
  data: ITeamOverviewData | null;
  matchSummary : iMatchSummary
}) => {

  let map = "unknown";

  if (matchSummary){
    map = "";
    console
    for ( const [matchId, result] of Object.entries(matchSummary.results)) {
      if (!map.includes(result.map)) {
        map += result.map + " ";
      }
    }
  }

  if (!data) return <p>There was an error fetching match data.</p>;
  return (
    <>
      <div className={styles.subHeader}>
        <span className={styles.matchId}>Maps: {map}</span>
      </div>
      <TeamOverview map={map} data={data} />
    </>
  );
};
