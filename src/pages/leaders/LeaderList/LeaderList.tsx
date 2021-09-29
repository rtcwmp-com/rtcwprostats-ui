import React, { Fragment, useContext, useState } from "react";
import { useQuery } from "react-query";
import { StatsApi } from "../../../api";
import { ILeaderItem } from "../../../api/types";
import { LeaderListContent } from "./LeaderListContent";
import { Loading } from "../../../components/Loading";
import { PageTitle } from "../../../components/PageTitle";
import styles from "./LeaderList.module.css";
import { RegionTypeContext } from "../../../context";
import { CATEGORIES } from "../../../constants";

export const LeaderList: React.FC = () => {
  const rTypeContext = useContext(RegionTypeContext);
  const { region, gametype } = rTypeContext;
  const [category, setCategory] = useState("elo");

  const { isLoading, data } = useQuery<ILeaderItem[]>(
    ["leaders", category, region, gametype, "50"],
    StatsApi.Leaders.GetLeaders
  );

  const onClickCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const element = e.currentTarget as HTMLButtonElement;
    setCategory(element.value);
  };

  return (
    <>
      <PageTitle>Leaders</PageTitle>
      <div className={styles.categoryWrapper}>
        <div className="horizontal">
          {CATEGORIES.map((item, idx) => (
            <button
              key={item.id}
              className={`btn ${
                category === item.id ? "btn-highlight" : "btn-dark"
              } btn-block btn-catselector `}
              value={item.id}
              onClick={onClickCategory}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.wrapper}>
        {isLoading && <Loading />}
        {data && <LeaderListContent data={data} />}
      </div>
    </>
  );
};
