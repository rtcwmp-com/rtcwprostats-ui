import React from "react";
import { PlayerStats } from "../../api/matches/types";
import styles from "./TeamOverview.module.css";
import frostbiteSrc from "../../assets/maps/te_frostbite.png";
import beachSrc from "../../assets/maps/mp_beach.png";
import { useMemo } from "react";

const mapsObj = {
  mp_beach: beachSrc,
  te_frostbite: frostbiteSrc,
} as Record<string, string>;

export type TeamOverviewData = { a: PlayerStats[]; b: PlayerStats[] };

export type TeamOverviewProps = {
  data: TeamOverviewData;
  map: string;
};

export const TeamOverview: React.FC<TeamOverviewProps> = ({ data, map }) => {
  const wrapperStyles = useMemo(() => {
    const backgroundImage = `url(${mapsObj[map]})`;
    return { backgroundImage };
  }, [map]);

  return (
    <div className={styles.wrapper} style={wrapperStyles}>
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
