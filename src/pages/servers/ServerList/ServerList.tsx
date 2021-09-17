import React from "react";
import { useQuery } from "react-query";
import { StatsApi } from "../../../api";
import { ServerDetail, ServerSimple } from "../../../api/servers/types";
import { PageTitle } from "../../../components/PageTitle/PageTitle";
import styles from "./ServerList.module.css";
import { formatDistance } from "date-fns";
import naSrc from "../../../assets/usa-flag.svg";
import euSrc from "../../../assets/eu-flag.svg";

const imageSources = {
  na: naSrc,
  eu: euSrc,
  sa: naSrc,
  unk: euSrc,
};

export const ServerList: React.FC = () => {
  const { isLoading, data } = useQuery<ServerSimple[]>(
    ["server-detail"],
    StatsApi.Servers.GetDetails
  );

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (data) {
    return (
      <>
        <PageTitle>Servers</PageTitle>
        <table>
		  <thead className={styles.header}>
			<tr>
			  <th>Region</th>
			  <th>Server Name</th>
			  <th>IP</th>
			  <th>Activity</th>
			</tr>
		  </thead>
		  <tbody>
          {data
            .sort((a, b) => {
              return (
                new Date(b.last_submission).getTime() -
                new Date(a.last_submission).getTime()
              );
            })
            .map((server, idx) => (
			<tr key={idx} className={styles.infoContainer}>
              <td>
                <img
                  className={styles.region}
                  src={imageSources[server.region]}
                  alt="Region flag"
                />
			  </td>
			  <td>
			    <span className={styles.serverName}>
				  {server.server_name}
			    </span>
			  </td>
			  <td>
				{server.IP.trim() && <span>{server.IP}</span>}
			  </td>
              <td>
                <span>
                  Last active{" "}
                  {formatDistance(
                    new Date(server.last_submission),
                    new Date()
                  )}{" "}
                  ago
                </span>
              </td>
            </tr>
			))}
		</tbody>
        </table>
      </>
    );
  }

  return <div>Error while fetching servers.</div>;
};
