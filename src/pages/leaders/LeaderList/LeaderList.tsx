import React, { useContext, useState } from "react";
import { HStack, Box, Button, ButtonGroup } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { StatsApi } from "../../../api";
import { ILeaderItem } from "../../../api/types";
import { LeaderListContent } from "./LeaderListContent";
import { Loading } from "../../../components/Loading";
import { PageTitle } from "../../../components/PageTitle";
import { RegionTypePicker } from "../../../components/Nav/RegionTypePicker";
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

  const continuous_metrics = ["elo", "kdr", "acc", "Caps per Game", "Caps per Taken", "HS Ratio"]

  return (
    <>
      <PageTitle>Leaders</PageTitle>
      <Box w="100%">
        <RegionTypePicker />
      </Box>
      <Box my="10px">
        <HStack>
          <Box w='100px'>
            {"Continuous"}
          </Box>
          <Box>
            {CATEGORIES.map((item) => (
              continuous_metrics.includes(item.id) && 
                <Button
                  key={item.id}
                  size="sm"
                  isActive={category === item.id}
                  value={item.id}
                  onClick={onClickCategory}
                  m="0 5px 5px"
                >
                  {item.name}
                </Button>
              
            ))}
          </Box>
          </HStack>
      </Box>
      <Box my="10px">
        <HStack>
          <Box w='100px'>
            {"Achievements"}
          </Box>
          <Box>
            {CATEGORIES.map((item) => (
              !continuous_metrics.includes(item.id) &&
              <Button
                key={item.id}
                size="sm"
                isActive={category === item.id}
                value={item.id}
                onClick={onClickCategory}
                m="0 5px 5px"
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </HStack>
      </Box>

      <div>
        {isLoading && <Loading />}
        {data && !("error" in data) && (
          <LeaderListContent data={data} category={category} />
        )}
      </div>
    </>
  );
};
