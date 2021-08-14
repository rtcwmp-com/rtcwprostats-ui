import { formatDistance } from "date-fns";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { StatsApi } from "../../../api";
import { Match } from "../../../api/matches/types";
import { PageTitle } from "../../../components/PageTitle/PageTitle";
import styles from "./MatchList.module.css";

const MatchRow: React.FC<{ match: Match }> = ({ match }) => {
  return (
    <Link
      to={`/matches/${match.match_id}/${match.map}`}
      className={styles.matchRow}
    >
      <span className={styles.map}>{match.map}</span>
      <span>{match.server_name}</span>
      <span className={styles.timestamp}>
        {formatDistance(new Date(match.date_time_human), new Date())} ago
      </span>
    </Link>
  );
};

export const MatchList: React.FC = () => {
  const { isLoading, data: matches } = useQuery<Match[]>(
    ["recent-matches"],
    StatsApi.Matches.Recent
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (matches) {
    return (
      <>
        <PageTitle>Recent matches</PageTitle>
        <div className={styles.wrapper}>
          {matches
            .filter(
              (item, idx, arr) =>
                arr.findIndex(
                  (idxItem) => idxItem.match_id === item.match_id
                ) === idx
            )
            .map((match) => (
              <MatchRow key={match.match_id} match={match} />
            ))}
        </div>
      </>
    );
  }

  return <div>Error while fetching matches</div>;
};
