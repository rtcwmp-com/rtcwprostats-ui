import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Box } from "@chakra-ui/layout";
import { StatsApi } from "../../../api";
import { IServerSimple } from "../../../api/types";
import { Loading } from "../../../components/Loading";
import { PageTitle } from "../../../components/PageTitle";
import { RegionTypePicker } from "../../../components/Nav/RegionTypePicker";
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
      <Box w="100%">
        <RegionTypePicker />
      </Box>
      {isLoading && <Loading />}
      {data && <ServerListContents data={data} />}
    </>
  );
};
