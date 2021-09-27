import React from "react";
import { ILeaderItem } from "../../../api/types";
import styles from "./LeaderListRow.module.css";
import { Link } from "react-router-dom";

export const LeaderListRow: React.FC<{ leaderItem: ILeaderItem }> = ({
  leaderItem,
}) => {
  return (
    <div className={styles.leaderRow}>
      <Link to={`/player/${leaderItem.guid}`} className={styles.leaderCell}>
        <span>{leaderItem.real_name}</span>
      </Link>
      <div className={styles.leaderCell}>{leaderItem.value}</div>
      <div className={styles.leaderCell}>{leaderItem.games}</div>
    </div>
  );
};

export default LeaderListRow;
