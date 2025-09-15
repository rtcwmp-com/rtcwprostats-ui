import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { theme } from "./HeatMapTheme";

const HeatMap: React.FC<{
  data: any
}> = ({ data }) => {
  const history = useHistory();

  const nivoData = useMemo(() => {
    if (!data || "error" in data) {
      return null;
    }
    let mapSeries: any = [
        {
          "id": "donkz",
          "data": [
            {
              "x": "beach",
              "y": 0.43
            },
            {
              "x": "sub",
              "y": 0.63
            },
            {
                "x": "base",
                "y": 0.8
              }
          ]
        },
        {
          "id": "ponker",
          "data": [
            {
              "x": "beach",
              "y": 0.75
            },
            {
              "x": "sub",
              "y": 0.15
            },
            {
                "x": "base",
                "y": 0.3
              }
          ]
        },
        {
            "id": "goo",
            "data": [
              {
                "x": "beach",
                "y": 0.5
              },
              {
                "x": "sub",
                "y": 0.65
              },
              {
                  "x": "base",
                  "y": 0.3
                }
            ]
          }
        
      ];
    return mapSeries;
  }, [data]);

  console.log(nivoData);

  return (
    <>
      {data && "error" in data && <>N/A</>}
      {data && nivoData && (
        <Box h={500}>
            <ResponsiveHeatMap 
                theme={theme}
                data={nivoData}
                margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
                valueFormat=" >-.1%"
                axisTop={{ legend: 'Maps', tickRotation: -45, legendOffset: -50 }}
                axisRight={{ legend: 'Players', legendOffset: 70 }}
                axisLeft={{ legend: 'Players', legendOffset: -72 }}
                colors={{
                    type: 'diverging',
                    scheme: 'red_blue',
                    divergeAt: 0.5,
                    minValue: 0,
                    maxValue: 1
                }}
                emptyColor="#555555"
                legends={[
                    {
                        anchor: 'bottom',
                        translateX: 0,
                        translateY: 30,
                        length: 400,
                        thickness: 8,
                        direction: 'row',
                        tickPosition: 'after',
                        tickSize: 3,
                        tickSpacing: 4,
                        tickOverlap: false,
                        tickFormat: '>-.2s',
                        title: 'Value →',
                        titleAlign: 'start',
                        titleOffset: 4
                    }
                ]}

            />
        </Box>
      )}
    </>
  );
};

export default HeatMap;
