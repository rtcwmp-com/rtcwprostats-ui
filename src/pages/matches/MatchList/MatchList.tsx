import React, { useContext } from "react";
import { useQuery } from "react-query";
import { StatsApi } from "../../../api";
import { IMatch } from "../../../api/types";
import { Loading } from "../../../components/Loading";
import { MatchListContent } from "./MatchListContent";
import { PageTitle } from "../../../components/PageTitle";
import styles from "./MatchList.module.css";
import { useParams } from "react-router-dom";
import { RegionTypeContext } from "../../../context";

export const MatchList: React.FC = () => {
  const { serverId } = useParams<{ serverId: string }>();

  const rTypeContext = useContext(RegionTypeContext);
  const { region, gametype } = rTypeContext;

  const { isLoading, data } = useQuery<IMatch[]>(
    ["matches-api", { serverId: serverId, region: region, gametype: gametype }],
    StatsApi.Matches.Recent
  );

  return (
    <>
      <PageTitle>Recent Matches</PageTitle>
      <div className={styles.wrapper}>
        {isLoading && <Loading />}
        {data && <MatchListContent data={data} />}
      </div>
    </>
  );
};
