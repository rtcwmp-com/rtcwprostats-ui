import React from "react";

import { TeamOverview } from "../../../components/TeamOverview/TeamOverview";
import { ITeamOverviewData, iMatchSummary } from "../../../api/types";
import styles from "./MatchDetailsContent.module.css";
import { Text, Link, Box } from "@chakra-ui/react";
import { API_BASE_URL } from "../../../constants";
import { unixToDate } from "../../../util";

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
      <Box display='flex' alignItems='' className={styles.subHeader}>
        <span className={styles.matchId}>{reportDescription}</span>
        { statsParamType == "Match" && 
          <Text className={styles.matchId}>
            {unixToDate(statsParam).toLocaleString(
            [],
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          )}
          </Text>
        }
        { statsParamType == "Match" && 
          <Text className={styles.matchId}>
            <Link href={API_BASE_URL + `/matches/` + statsParam + `1`} isExternal><span>r1 </span></Link>
            <Link href={API_BASE_URL + `/matches/` + statsParam + `2`} isExternal><span>r2 </span></Link>
            <Link href={API_BASE_URL + `/gamelogs/` + statsParam + `1`} isExternal><span>g1 </span></Link>
            <Link href={API_BASE_URL + `/gamelogs/` + statsParam + `2`} isExternal><span>g2 </span></Link>
            <Link href={API_BASE_URL + `/stats/` + statsParam} isExternal><span>s </span></Link>
            <Link href={API_BASE_URL + `/wstats/` + statsParam} isExternal><span>w </span></Link>
          </Text>
        }
      </Box>
      { /* If all players are mingled in the same team (and the other one is empty), don't display match summaries as there can be too much irrelevant data. */ }
      { data && data.b.length > 0 && <TeamOverview matchSummary={matchSummary} data={data} /> }
    </>
  );
};
