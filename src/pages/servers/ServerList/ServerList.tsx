import React, { useContext } from "react";
import { useQuery } from "react-query";
import { StatsApi } from "../../../api";
import { IServerSimple } from "../../../api/types";
import { Loading } from "../../../components/Loading";
import { PageTitle } from "../../../components/PageTitle";
import { ServerListContents } from "./ServerListContents";

import { RegionTypeContext } from "../../../context";

export const ServerList: React.FC = () => {
  const rTypeContext = useContext(RegionTypeContext);
  const { region } = rTypeContext;

  const { isLoading, data } = useQuery<IServerSimple[]>(
    ["server-detail", region],
    StatsApi.Servers.GetDetails
  );

  return (
    <>
      <PageTitle>Servers</PageTitle>
      {isLoading && <Loading />}
      {data && <ServerListContents data={data} />}
    </>
  );
};
