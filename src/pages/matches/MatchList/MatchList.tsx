import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { StatsApi } from "../../../api";
import { Match } from "../../../api/matches/types";
import { PageTitle } from "../../../components/PageTitle/PageTitle";
import styles from "./MatchList.module.css";

const MatchRow: React.FC<{ match: Match }> = ({ match }) => {
  return (
    <Link to={`/matches/${match.match_round_id}`} className={styles.matchRow}>
      {match.date_time_human} - {match.match_id}
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
        <div>
          {matches.map((match) => (
            <MatchRow key={match.match_id} match={match} />
          ))}
        </div>
      </>
    );
  }

  return <div>Error while fetching matches</div>;
};
