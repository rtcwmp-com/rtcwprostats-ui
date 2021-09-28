import React from "react";
import { ILeaderItem } from "../../../api/types";
import { LeaderListRow } from "./LeaderListRow";
import styles from "./LeaderListContent.module.css";

export const LeaderListContent: React.FC<{ data: ILeaderItem[] }> = ({
  data,
}) => {
  return (
    <>
      <div className={styles.headerRow}>
        <div className={styles.headerCell}>Player</div>
        <div className={styles.headerCell}>Value</div>
        <div className={styles.headerCell}>Games</div>
      </div>

      {data
        .sort((a, b) => {
          return b.value - a.value;
        })
        .map((leaderItem) => (
          <LeaderListRow key={leaderItem.guid} leaderItem={leaderItem} />
        ))}
    </>
  );
};

export default LeaderListContent;
