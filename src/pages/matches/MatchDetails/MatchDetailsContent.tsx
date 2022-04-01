import React from "react";

import { TeamOverview } from "../../../components/TeamOverview/TeamOverview";
import { ITeamOverviewData, iMatchSummary } from "../../../api/types";
import styles from "./MatchDetailsContent.module.css";
import { Link } from "@chakra-ui/react";
import { API_BASE_URL } from "../../../constants";

export const MatchDetailsContent = ({
  data,
  matchSummary,
  statsParamType,
  statsParam
}: {
  data: ITeamOverviewData | null;
  matchSummary : iMatchSummary;
  statsParamType: string;
  statsParam: string;
}) => {

  if (!data) return <p>There was an error fetching match data.</p>;
  const reportDescription = statsParamType + ": " + statsParam;
  return (
    <>
      <div className={styles.subHeader}>
        <span className={styles.matchId}>{reportDescription}</span>
        { statsParamType == "Match" && 
          <span className={styles.matchId}>
            <Link className={styles.matchId} href={API_BASE_URL + `/matches/16485172781`} isExternal><span>r1</span></Link>
            <Link className={styles.matchId} href={API_BASE_URL + `/matches/16485172782`} isExternal><span>r2</span></Link>
            <Link className={styles.matchId} href={API_BASE_URL + `/gamelogs/16485172781`} isExternal><span>g1</span></Link>
            <Link className={styles.matchId} href={API_BASE_URL + `/gamelogs/16485172782`} isExternal><span>g2</span></Link>
            <Link className={styles.matchId} href={API_BASE_URL + `/stats/1648517278`} isExternal><span>s</span></Link>
            <Link className={styles.matchId} href={API_BASE_URL + `/wstats/1648517278`} isExternal><span>w</span></Link>
          </span>
        }
      </div>
      { /* If all players are mingled in the same team (and the other one is empty), don't display match summaries as there can be too much irrelevant data. */ }
      { data && data.b.length > 0 && <TeamOverview matchSummary={matchSummary} data={data} /> }
    </>
  );
};
