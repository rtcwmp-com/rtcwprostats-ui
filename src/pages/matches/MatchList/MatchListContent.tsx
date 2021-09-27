import React from "react";
import { IMatch } from "../../../api/types";
import { MatchListRow } from "./MatchListRow";
import styles from "./MatchList.module.css";

export const MatchListContent: React.FC<{ data: IMatch[] }> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      {data
        .filter(
          (item, idx, arr) =>
            arr.findIndex((idxItem) => idxItem.match_id === item.match_id) ===
            idx
        )
        .map((match) => (
          <MatchListRow key={match.match_id} match={match} />
        ))}
    </div>
  );
};
