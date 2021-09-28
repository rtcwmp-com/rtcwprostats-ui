import React, { Fragment, useContext } from "react";
import { useQuery } from "react-query";
import { StatsApi } from "../../../api";
import { ILeaderItem } from "../../../api/types";
import { LeaderListContent } from "./LeaderListContent";
import { Loading } from "../../../components/Loading";
import { PageTitle } from "../../../components/PageTitle";
import styles from "./LeaderList.module.css";
import { RegionTypeContext } from "../../../context";

export const LeaderList: React.FC = () => {
  const rTypeContext = useContext(RegionTypeContext);
  const { region, gametype } = rTypeContext;

  const { isLoading, data } = useQuery<ILeaderItem[]>(
    ["leaders", "elo", region, gametype, "30"],
    StatsApi.Leaders.GetLeaders
  );

  return (
    <>
      <PageTitle>Leaders</PageTitle>
      <div className={styles.wrapper}>
        {isLoading && <Loading />}
        {data && <LeaderListContent data={data} />}
      </div>
    </>
  );
};
