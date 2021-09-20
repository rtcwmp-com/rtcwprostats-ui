import { formatDistance } from "date-fns";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { StatsApi } from "../../../api";
import { Match } from "../../../api/matches/types";
import { PageTitle } from "../../../components/PageTitle/PageTitle";
import styles from "./MatchList.module.css";
import { useParams } from "react-router-dom";
import RegiontypeContext from '../../../context/regiontype/regiontypeContext';

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
	const { serverId } = useParams<{ serverId: string }>();
	
	const regiontypeContext = useContext(RegiontypeContext);
    const { region, gametype } = regiontypeContext;
  
	const { isLoading, data: matches } = useQuery<Match[]>(
		["matches-api", { serverId: serverId, region: region, gametype: gametype }],
		StatsApi.Matches.Recent
	);

	if (isLoading) {
    return <div>Loading...</div>;
  }

  if (matches && !("error" in matches)) {
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
