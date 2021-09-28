import React from "react";

import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import { IServerSimple } from "../../../api/types";
import { dateStringToDate } from "../../../util";
import { COUNTRY_IMAGE_SOURCES } from "../../../constants";
import styles from "./ServerListContents.module.css";

export const ServerListRow: React.FC<{ server: IServerSimple }> = ({
  server,
}) => {
  return (
    <div className={styles.serverRow}>
      <img
        className={styles.region}
        src={COUNTRY_IMAGE_SOURCES[server.region]}
        alt="Region flag"
      />
      <Link
        to={`/matches/server/${server.server_name}`}
        className={styles.serverCell}
      >
        <span>{server.server_name}</span>
      </Link>
      <div className={styles.serverCell}>
        {server.IP.trim() && <span>{server.IP}</span>}
      </div>
      <div className={styles.serverCell}>
        {" "}
        <span className={styles.timestamp}>
          Last active{" "}
          {formatDistance(dateStringToDate(server.last_submission), new Date())}{" "}
          ago
        </span>
      </div>
    </div>
  );
};

export default ServerListRow;
