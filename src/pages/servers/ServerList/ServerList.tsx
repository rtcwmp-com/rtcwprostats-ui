import React, { Fragment, useContext } from 'react';
import { useQuery } from "react-query";
import { StatsApi } from "../../../api";
import { ServerDetail, ServerSimple } from "../../../api/servers/types";
import { PageTitle } from "../../../components/PageTitle/PageTitle";
import styles from "./ServerList.module.css";
import { formatDistance } from "date-fns";
import naSrc from "../../../assets/usa-flag.svg";
import euSrc from "../../../assets/eu-flag.svg";
import saSrc from "../../../assets/sa-flag.svg";
import unkSrc from "../../../assets/unk-flag.svg";
import { Link } from 'react-router-dom';
import RegiontypeContext from '../../../context/regiontype/regiontypeContext';

const imageSources = {
  na: naSrc,
  eu: euSrc,
  sa: saSrc,
  unk: unkSrc,
};

const ServerRow: React.FC<{ server: ServerSimple }> = ({ server }) => {
	
  return (
  <div className={styles.serverRow}>
	<img
		  className={styles.region}
		  src={imageSources[server.region]}
		  alt="Region flag"
		/>
	<Link to={`/matches/server/${server.server_name}`} className={styles.serverCell}><span>{server.server_name}</span></Link>
	<div className={styles.serverCell}>{server.IP.trim() && <span>{server.IP}</span>}</div>
    <div className={styles.serverCell}>  <span className={styles.timestamp}>
                  Last active{" "}
                  {formatDistance(
                    new Date(server.last_submission),
                    new Date()
                  )}{" "}
                  ago
      </span></div>
  </div>
  );
};

export const ServerList: React.FC = () => {
  const regiontypeContext = useContext(RegiontypeContext);
  const { region } = regiontypeContext;
  
  const { isLoading, data } = useQuery<ServerSimple[]>(
    ["server-detail", region],
    StatsApi.Servers.GetDetails
  );

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (data && !("error" in data)) {
	
    return (
      <>
        <PageTitle>Servers</PageTitle>
		   <div className={styles.wrapper}>
			   {/*
			<div className={styles.headerRow}>
				<div className={styles.headerCell}>Region</div>
				<div className={styles.headerCell}>Server Name</div>
				<div className={styles.headerCell}>IP</div>
				<div className={styles.headerCell}><span className={styles.timestamp}>Last active</span></div>
			</div>
			   */}
          {data
            .sort((a, b) => {
              return (
                new Date(b.last_submission).getTime() -
                new Date(a.last_submission).getTime()
              );
            })
            .map((server, idx) => (
				<ServerRow key={server.server_name} server={server} />
			))}
			</div>
      </>
    );
  }

  return <div>Error while fetching servers.</div>;
};
