import React from "react";
import { IPlayerStats } from "../../api/types";
import { MAP_SOURCES } from "../../constants";
import styles from "./TeamOverview.module.css";

export type TeamOverviewData = { a: IPlayerStats[]; b: IPlayerStats[] };

export type TeamOverviewProps = {
  data: TeamOverviewData;
  map: string;
};

export const TeamOverview: React.FC<TeamOverviewProps> = ({ data, map }) => {
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
      <div className={styles.center}>vs</div>
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
