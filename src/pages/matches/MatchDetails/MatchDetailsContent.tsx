import React from "react";

import { TeamOverview } from "../../../components/TeamOverview/TeamOverview";
import { ITeamOverviewData, iMatchSummary } from "../../../api/types";
import styles from "./MatchDetailsContent.module.css";

export const MatchDetailsContent = ({
  data,
  matchSummary,
  reportDescription
}: {
  data: ITeamOverviewData | null;
  matchSummary : iMatchSummary;
  reportDescription : string;
}) => {

  if (!data) return <p>There was an error fetching match data.</p>;
  return (
    <>
      <div className={styles.subHeader}>
        <span className={styles.matchId}>{reportDescription}</span>
      </div>
      { /* If all players are mingled in the same team (and the other one is empty), don't display match summaries as there can be too much irrelevant data. */ }
      { data && data.b.length > 0 && <TeamOverview matchSummary={matchSummary} data={data} /> }
    </>
  );
};
