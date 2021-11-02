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
      <TeamOverview matchSummary={matchSummary} data={data} />
    </>
  );
};
