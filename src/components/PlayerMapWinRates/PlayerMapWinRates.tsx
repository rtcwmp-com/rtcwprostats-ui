import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { BarDatum, ResponsiveBar} from "@nivo/bar";
import { BasicTooltip } from "@nivo/tooltip";
import { theme } from "./PlayerMapWinRatesTheme";
//import { IPlayerMap } from "../../api/types";


export const PlayerMapWinRates: React.FC<{
  data: any
}> = ({ data }) => {
  const history = useHistory();

  // function convertToNivoHeatmap(gameData: IMapsAllItem[]): HeatmapData[] {
  //   let heatMapData: any = gameData.map((player) => ({
  //     id: player.real_name + "/" + player.id.substring(0,2),
  //     data: player.data.map((mapStats) => ({
  //       x: mapStats.map,
  //       y: parseFloat((mapStats.wins / mapStats.games).toFixed(2)),
  //       wins: mapStats.wins,
  //       games: mapStats.games
  //     }))
  //   }));
  //   return heatMapData.sort((a: any, b: any) => a.id.localeCompare(b.id));
  // }

  const nivoData = useMemo(() => {
    if (!data || "error" in data) {
      return null;
    }
    //let mapSeries: any = convertToNivoHeatmap(data);
    let mapSeries: BarDatum[] = [
      {
        "map": "mp_ice",
        "wins": 20,
        "draws": 60,
        "losses": 20
      },
      {
        "map": "mp_beach",
        "wins": 60,
        "draws": 10,
        "losses": 30
      }];
    return mapSeries;
  }, [data]);

  //console.log(nivoData);

  return (
    <>
      {data && "error" in data && <>N/A</>}
      {data && nivoData && (
        <Box h={500}>
            <ResponsiveBar
              data={nivoData}
              theme={theme}
              indexBy="map"
              layout="horizontal"
              padding={0}
              labelSkipWidth={12}
              labelSkipHeight={12}
              legends={[
                  {
                      dataFrom: 'keys',
                      anchor: 'bottom-right',
                      direction: 'column',
                      translateX: 120,
                      itemsSpacing: 3,
                      itemWidth: 100,
                      itemHeight: 16
                  }
              ]}
              axisBottom={{ legend: 'map (indexBy)', legendOffset: 32 }}
              axisLeft={{ legend: 'records', legendOffset: -40 }}
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          />
        </Box>
      )}
    </>
  );
};
