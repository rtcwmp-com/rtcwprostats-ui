import React, { useContext, useState, useMemo } from "react";
import { HStack, Box, Button, ButtonGroup } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { StatsApi } from "../../../api";
import { ILeaderItem, ISeason } from "../../../api/types";
import { LeaderListContent } from "./LeaderListContent";
import { Loading } from "../../../components/Loading";
import { PageTitle } from "../../../components/PageTitle";
import { RegionTypePicker } from "../../../components/Nav/RegionTypePicker";
import { RegionTypeContext } from "../../../context";
import { CATEGORIES } from "../../../constants";
import { Select } from '@chakra-ui/react'

export const LeaderList: React.FC = () => {
  const rTypeContext = useContext(RegionTypeContext);
  const { region, gametype } = rTypeContext;
  const [category, setCategory] = useState("elo");
  const [season, setSeason] = useState("current");

  const { isLoading, data } = useQuery<ILeaderItem[]>(
    ["leaders", category, region, gametype, "50", season],
    StatsApi.Leaders.GetLeaders
  );

  const seasonResults = useQuery<ISeason[]>([region, gametype], () =>
    StatsApi.Seasons.SeasonsByRegionType(region, gametype)
  );
  const seasonLoading = seasonResults.isLoading;
  const seasonResultData = seasonResults.data;

  const seasonData = useMemo(() => {
    if (!seasonResultData) {
      return null;
    }

    let seasonsData: ISeason[] = [];
    seasonsData.push({"season_prefix": "current", "season_name": 'current', "player_number": 0, "end_date": ""});
    
    if ("error" in seasonResultData || seasonResultData.length === 0) {
      console.log("Warning: no season found for " + region + "/" + gametype);
    }
    else {
      seasonsData = seasonsData.concat(seasonResultData);
    }
    
    
    return seasonsData;
  }, [data]);

  const continuous_metrics = ["elo"];
  const seasonal_metrics = ["kdr", "acc", "Caps per Game", "Caps per Taken", "HS Ratio"];

  const onClickCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const element = e.currentTarget as HTMLButtonElement;
    setCategory(element.value);
    if (!seasonal_metrics.includes(element.value)){
      setSeason("current");
    }
  };

  const onChangeSeason = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const element = e.currentTarget as HTMLSelectElement;
    setSeason(element.value);
    if (!seasonal_metrics.includes(element.value)){
      setCategory("kdr");
    }
  };

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
                <Button
                  key={"elo"}
                  size="sm"
                  isActive={category === "elo"}
                  value={"elo"}
                  onClick={onClickCategory}
                  m="0 5px 5px"
                >
                  {"ELO"}
                </Button>
          </Box>
          </HStack>
      </Box>
      <Box my="10px">
        <HStack>
          <Box w='100px'>
            {"Seasonal"}
          </Box>
          <Box>
            {seasonLoading && <Loading />}
            {seasonData && !("error" in seasonData) && (
            <Select value={season} onChange={onChangeSeason}>
              {seasonData.map(s => {
                return (
                  <option value={s.season_prefix}>{s.season_name}</option>
                )
              })}
            </Select>
            )}
          </Box>
          <Box>
            {CATEGORIES.map((item) => (
              seasonal_metrics.includes(item.id) && 
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
              !seasonal_metrics.includes(item.id) && (item.id != "elo") &&
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
