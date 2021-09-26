import React, { Fragment, useContext } from 'react';
import { useQuery } from "react-query";
import { StatsApi } from "../../../api";
import { LeaderItem } from "../../../api/leaders/types";
import { PageTitle } from "../../../components/PageTitle/PageTitle";
import styles from "./LeaderList.module.css";
import { Link } from 'react-router-dom';
import RegiontypeContext from '../../../context/regiontype/regiontypeContext';

const LeaderRow: React.FC<{ leaderItem: LeaderItem }> = ({ leaderItem }) => {
	
  return (
  <div className={styles.leaderRow}>
	<Link to={`/player/${leaderItem.guid}`} className={styles.leaderCell}><span>{leaderItem.real_name}</span></Link>
	<div className={styles.leaderCell}>{leaderItem.value}</div>
	<div className={styles.leaderCell}>{leaderItem.games}</div>
  </div>
  );
};

export const LeaderList: React.FC = () => {
  const regiontypeContext = useContext(RegiontypeContext);
  const { region, gametype } = regiontypeContext;
  
  const { isLoading, data } = useQuery<LeaderItem[]>(
    ["leaders", "elo", region, gametype, "30"],
    StatsApi.Leaders.GetLeaders
  );

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (data && !("error" in data)) {
	
    return (
      <>
        <PageTitle>Leaders</PageTitle>
		   <div className={styles.wrapper}>
			<div className={styles.headerRow}>
				<div className={styles.headerCell}>Player</div>
				<div className={styles.headerCell}>Elo</div>
				<div className={styles.headerCell}>Games</div>
			</div>
			   
          {data
            .sort((a, b) => {return (b.value - a.value);})
            .map((leaderItem) => (
			//.map((leaderItem, idx) => (
				<LeaderRow key={leaderItem.guid} leaderItem={leaderItem} />
			))}
			</div>
      </>
    );
  }

  return <div>Error while fetching leaderboard.</div>;
};
