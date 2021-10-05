import React, { useContext, useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { StatsApi } from "../../../api";
import { ILeaderItem } from "../../../api/types";
import { LeaderListContent } from "./LeaderListContent";
import { Loading } from "../../../components/Loading";
import { PageTitle } from "../../../components/PageTitle";
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
      <ButtonGroup>
        {CATEGORIES.map((item) => (
          <Button
            key={item.id}
            colorScheme="teal"
            size="sm"
            isActive={category === item.id}
            value={item.id}
            onClick={onClickCategory}
          >
            {item.name}
          </Button>
        ))}
      </ButtonGroup>

      <div>
        {isLoading && <Loading />}
        {data && !("error" in data) && (
          <LeaderListContent data={data} category={category} />
        )}
      </div>
    </>
  );
};
