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
          {data
            .sort((a, b) => {
              return (
                new Date(b.last_submission).getTime() -
                new Date(a.last_submission).getTime()
              );
            })
            .map((server, idx) => (
			<tr>
              <td className={styles.infoContainer} key={idx}>
                <img
                  className={styles.region}
                  src={imageSources[server.region]}
                  alt="Region flag"
                />
			  </td>
			  <td className={styles.infoContainer}>
			    <span className={styles.serverName}>
				  {server.server_name}
			    </span>
			  </td>
			  <td className={styles.infoContainer}>
				{server.IP.trim() && <span>{server.IP}</span>}
			  </td>
              <td className={styles.infoContainer}>
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
        </table>
      </>
    );
  }

  return <div>Error while fetching servers.</div>;
};
