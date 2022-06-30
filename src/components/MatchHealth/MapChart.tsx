import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { IMatchHealthResponse } from "../../api/types";
import { Box } from "@chakra-ui/react";
import { BarDatum, ResponsiveBar} from "@nivo/bar";
import { theme } from "./MatchHealthTheme";

const MapChart: React.FC<{
  data: IMatchHealthResponse
}> = ({ data }) => {
  const history = useHistory();

  const nivoData = useMemo(() => {
    if (!data || "error" in data) {
      return null;
    }

    let mapsSorted = Object.keys(data.current_maps).map(function(key) {
        return [key, data.current_maps[key]];
    });
    
    mapsSorted.sort(
        (first:any, second:any) => { return first[1] - second[1] }
    );

    let mapSeries: BarDatum[] = [];
    mapsSorted.map((mapArr: any) => {
      try {
        const map: BarDatum = {
          map: mapArr[0],
          games: mapArr[1],
        };
        mapSeries.push(map);
      } catch (err) {
        console.error(err);
      }
    });

    return mapSeries;
  }, [data]);

  return (
    <>
      {data && "error" in data && <>N/A</>}
      {data && nivoData && (
        <Box h={500}>
          <ResponsiveBar
            data={nivoData}
            theme={theme}
            enableGridY={false}
            keys={["games"]}
            indexBy="map"
            margin={{ top: 0, right: 50, bottom: 50, left: 100 }}
            padding={0.1}
            layout="horizontal"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'category10' }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Games',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
        />
        </Box>
      )}
    </>
  );
};

export default MapChart;
