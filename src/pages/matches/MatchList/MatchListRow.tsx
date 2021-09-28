import { formatDistance } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { dateStringToDate } from "../../../util";
import { IMatch } from "../../../api/types";
import styles from "./MatchListRow.module.css";

export const MatchListRow: React.FC<{ match: IMatch }> = ({ match }) => {
  return (
    <Link
      to={`/matches/${match.match_id}/${match.map}`}
      className={styles.matchRow}
    >
      <span className={styles.map}>{match.map}</span>
      <span>{match.server_name}</span>
      <span className={styles.timestamp}>
        {formatDistance(dateStringToDate(match.date_time_human), new Date())}{" "}
        ago
      </span>
    </Link>
  );
};
