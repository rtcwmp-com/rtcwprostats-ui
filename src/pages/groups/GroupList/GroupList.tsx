import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Box } from "@chakra-ui/layout";
import { useHistory, useLocation } from "react-router-dom";
import { StatsApi } from "../../../api";
import { IGroupResponse } from "../../../api/types";
import { Loading } from "../../../components/Loading";
import { GroupListContent } from "./GroupListContent";
import { PageTitle } from "../../../components/PageTitle";
import { RegionTypePicker } from "../../../components/Nav/RegionTypePicker";
import { RegionTypeContext } from "../../../context";

interface stateType {
  shouldRefetch: boolean;
}

export const GroupList: React.FC = () => {
  const [retryCount, setRetryCount] = useState<number>(0);
  const rTypeContext = useContext(RegionTypeContext);
  const { region, gametype } = rTypeContext;
  const { state = {} as stateType } = useLocation<stateType>();
  const history = useHistory();

  const { isLoading, data, refetch } = useQuery<IGroupResponse>(
    ["groups-api", { region: region, gametype: gametype }],
    StatsApi.Groups.RegionType
  );

  const { shouldRefetch } = state;

  useEffect(() => {
    if (shouldRefetch && data) {
      if (data[Object.keys(data)[0]]["cached"] === "No" && retryCount <= 3) {
        setTimeout(() => {
          refetch();
          setRetryCount(retryCount + 1);
        }, 3000);
      } else {
        setRetryCount(0);
        history.replace({ state: undefined });
      }
    }
  }, [refetch, history, shouldRefetch, setRetryCount, retryCount, data]);

  return (
    <>
      <PageTitle>Recent Match Groups</PageTitle>
      <Box w="100%">
        <RegionTypePicker />
      </Box>

      {isLoading && <Loading />}
      {data && !("error" in data) && (
        <GroupListContent data={data} shouldRefetch={shouldRefetch} />
      )}
    </>
  );
};
