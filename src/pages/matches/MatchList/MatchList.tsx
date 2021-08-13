import React from "react";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { StatsApi } from "../../../api";
import { Match } from "../../../api/matches/types";
import { PageTitle } from "../../../components/PageTitle/PageTitle";
import { toList } from "../../../util";
import styles from "./MatchList.module.css";

type AggregatedMatchData = Match & {
  roundIds: string[];
};

const MatchRow: React.FC<{ match: AggregatedMatchData }> = ({ match }) => {
  return (
    <Link
      to={`/matches/${match.roundIds.join(",")}`}
      className={styles.matchRow}
    >
      {match.date_time_human} - {match.match_id}
    </Link>
  );
};

export const MatchList: React.FC = () => {
  const { isLoading, data: matchesData } = useQuery<Match[]>(
    ["recent-matches"],
    StatsApi.Matches.Recent
  );

  const matches = useMemo(() => {
    if (!matchesData) {
      return [];
    }

    const aggregatedData = matchesData.reduce((acc, match) => {
      if (acc[match.match_id]) {
        acc[match.match_id].roundIds.push(match.match_round_id);
      } else {
        acc[match.match_id] = { ...match, roundIds: [match.match_round_id] };
      }

      return acc;
    }, {} as Record<string, AggregatedMatchData>);
    return toList(aggregatedData);
  }, [matchesData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
};
