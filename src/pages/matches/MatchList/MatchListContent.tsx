import React from "react";
import { IMatch } from "../../../api/types";
import { MatchListRow } from "./MatchListRow";

export const MatchListContent: React.FC<{ data: IMatch[] }> = ({ data }) => {
  return (
    <div>
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
