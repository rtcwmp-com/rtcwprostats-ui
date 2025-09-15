import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { IMatchHealthResponse } from "../../api/types";
import { Box } from "@chakra-ui/react";
import { BarDatum, ResponsiveBar} from "@nivo/bar";
import { theme } from "./MatchHealthTheme";
import { isoDateStringToHour } from "../../util";

const HourChart: React.FC<{
  data: IMatchHealthResponse
}> = ({ data }) => {
  const history = useHistory();

  const nivoData = useMemo(() => {
    if (!data || "error" in data) {
      return null;
    }

    //Fill in all hours for a nice distribution
    type dayBucketsInterface = {
      [hour: string]: number
    }
    let hourBuckets: dayBucketsInterface = {};
    for (let hour = 1; hour < 25; hour++) {
      hourBuckets[String(hour).padStart(2, '0')] = 0;
    }

    data.current.map((matchId: string) => {
      const hour = isoDateStringToHour(matchId.slice(0,-1));
      hourBuckets[hour] = hourBuckets[hour]+ 1;
    });

    let hourSeries: BarDatum[] = [];
    Object.keys(hourBuckets).map((hour: string) => {
      try {
        if (parseInt(hour) == 0){
          hour = "24";
        }
        const map: BarDatum = {
          hour: hour,
          games: String(hourBuckets[hour]),
        };
        hourSeries.push(map);
      } catch (err) {
        console.error(err);
      }
    });

    console.debug(hourSeries);
    return hourSeries;
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
            indexBy="hour"
            margin={{ top: 0, right: 50, bottom: 50, left: 100 }}
            padding={0.1}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'category10' }}
            axisTop={null}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Matches played',
              legendPosition: 'middle',
              legendOffset: -40
          }}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Hour of the Day',
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

export default HourChart;
