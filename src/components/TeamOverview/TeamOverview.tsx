import React from "react";
import { ITeamOverviewData } from "../../api/types";
import { MAP_SOURCES } from "../../constants";
import styles from "./TeamOverview.module.css";

export type TeamOverviewProps = {
  data: ITeamOverviewData;
  map: string;
};

<<<<<<< HEAD
export const TeamOverview: React.FC<TeamOverviewProps> = ({ data, matchSummary }) => {
  
  let map = "unknown";
  if (matchSummary) {
    map = matchSummary.results[Object.keys(matchSummary.results)[0]].map;
  }

=======
export const TeamOverview: React.FC<TeamOverviewProps> = ({ data, map }) => {
>>>>>>> 56bfd094374943e3bce319b30b0b769fba53acb5
  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundImage: `url(${(MAP_SOURCES as Record<string, string>)[map]})`,
      }}
    >
      <div className={styles.overlay} />
      <div className={styles.side}>
        <div className={styles.textWrapper}>
          {data.a.map(({ alias }) => (
            <span key={alias}>{alias}</span>
          ))}
        </div>
      </div>
<<<<<<< HEAD
      <div className={styles.center}>
        <div className={styles.map}>
        {Object.entries(matchSummary.results).map(([matchId, result]) => (
            <span key={matchId}>
              {result.winnerAB == "TeamA" ? "<" : " " }
              {result.map} ({result.round1 ? result.round1.duration_nice : "xx:xx" }/{result.round2 ? result.round2.duration_nice : "xx:xx"})
              {result.winnerAB == "TeamB" ? ">" : " " }
            </span>
          ))}
        </div>
      </div>
=======
      <div className={styles.center}>vs</div>
>>>>>>> 56bfd094374943e3bce319b30b0b769fba53acb5
      <div className={styles.side}>
        <div className={styles.textWrapper}>
          {data.b.map(({ alias }) => (
            <span key={alias}>{alias}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
