import React from "react";
import { Box } from "@chakra-ui/layout";
import { PageTitle } from "../../components/PageTitle";
import { HealthStats } from "../../components/HealthStats";
import { RegionTypePicker } from "../../components/Nav/RegionTypePicker";
import { useContext, useEffect} from "react";
import { RegionTypeContext } from "../../context";
import { Loading } from "../../components/Loading";
import { StatsApi } from "../../api";
import { useQuery } from "react-query";
import { IMatchHealthResponse } from "../../api/types";

export const HealthSheet: React.FC = () => {
  const rTypeContext = useContext(RegionTypeContext);
  const { region, gametype } = rTypeContext;
  const regionKey = `${region}#${gametype}`;

  const { data, isLoading, refetch } = useQuery<IMatchHealthResponse>(
    "matchhealth",
    () => StatsApi.Matches.MatchHealthAPI(region, gametype)
  );

  useEffect(() => {
    refetch();
  }, [region, gametype]);

  return (
    <>
      <PageTitle />
      <Box w="100%">
        <RegionTypePicker />
      </Box>
      {isLoading && <Loading />}
      {data && <HealthStats data={data} region={region} gametype={gametype}/>}
    </>
  );
};
