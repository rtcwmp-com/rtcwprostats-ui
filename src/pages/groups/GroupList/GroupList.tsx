import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Box } from "@chakra-ui/layout";
import { StatsApi } from "../../../api";
import { IGroupResponse } from "../../../api/types";
import { Loading } from "../../../components/Loading";
import { GroupListContent } from "./GroupListContent";
import { PageTitle } from "../../../components/PageTitle";
import { RegionTypePicker } from "../../../components/Nav/RegionTypePicker";
import { useParams } from "react-router-dom";
import { RegionTypeContext } from "../../../context";

export const GroupList: React.FC = () => {
  const rTypeContext = useContext(RegionTypeContext);
  const { region, gametype } = rTypeContext;

  const { isLoading, data } = useQuery<IGroupResponse>(
    ["groups-api", { region: region, gametype: gametype }],
    StatsApi.Groups.RegionType
  );

  return (
    <>
      <PageTitle>Recent Match Groups</PageTitle>
      <Box w="100%">
        <RegionTypePicker />
      </Box>
      <br/>
      <br/>
      <p>[!][!][!]  This page is under construction and links lead nowhere. Standby.[!][!][!]</p> 
      <br/>
      <br/>

      <div>
        {isLoading && <Loading />}
        {data && !("error" in data) && (
          <GroupListContent data={data} />
        )}
      </div>
    </>
  );
};
