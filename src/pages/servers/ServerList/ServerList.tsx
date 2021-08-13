import React from "react";
import { useQuery } from "react-query";
import { StatsApi } from "../../../api";
import { ServerDetail } from "../../../api/servers/types";
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
  const { isLoading, data } = useQuery<ServerDetail[]>(
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
        <div className={styles.wrapper}>
          {data
            .sort((a, b) => {
              return (
                new Date(b.last_submission).getTime() -
                new Date(a.last_submission).getTime()
              );
            })
            .map((server, idx) => (
              <div className={styles.serverInfo} key={idx}>
                <img
                  className={styles.region}
                  src={imageSources[server.region]}
                  alt="Region flag"
                />
                <div className={styles.colorBg}>
                  <span className={styles.serverName}>
                    {server.server_name}
                  </span>
                  <span className={styles.gameVersion}>
                    {server.data.gameVersion}
                  </span>
                </div>
                <div className={styles.infoContainer}>
                  <span>
                    Last active{" "}
                    {formatDistance(
                      new Date(server.last_submission),
                      new Date()
                    )}{" "}
                    ago
                  </span>
                  {server.IP.trim() && <span>{server.IP}</span>}
                </div>
              </div>
            ))}
        </div>
      </>
    );
  }

  return <div>Error while fetching servers.</div>;
};
