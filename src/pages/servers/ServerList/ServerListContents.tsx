import React from "react";

import { ServerListRow } from "./ServerListRow";
import { IServerSimple } from "../../../api/types";

export const ServerListContents = ({ data }: { data: IServerSimple[] }) => {
  if (!data) return <p>There was an error fetching server data.</p>;
  return (
    <>
      {data
        .sort((a, b) => {
          return (
            new Date(b.last_submission).getTime() -
            new Date(a.last_submission).getTime()
          );
        })
        .map((server, idx) => (
          <ServerListRow server={server} key={idx} />
        ))}
    </>
  );
};
