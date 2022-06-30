import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { IMatchHealthResponse } from "../../api/types";
import { Box } from "@chakra-ui/react";
import { BarDatum, ResponsiveBar} from "@nivo/bar";
import { theme } from "./MatchHealthTheme";
import { isoDateStringToDayOfWeek } from "../../util";

const DayChart: React.FC<{
  data: IMatchHealthResponse
}> = ({ data }) => {
  const history = useHistory();

  const nivoData = useMemo(() => {
    if (!data || "error" in data) {
      return null;
    }
    
    type dayBucketsInterface = {
        [dayofWeek: string]: number
    }
    //Fill in all hours for a nice distribution
    let dayBuckets: dayBucketsInterface = {
        Sunday:0,
        Monday:0,
        Tuesday:0,
        Wednesday:0,
        Thursday:0,
        Friday:0,
        Saturday:0
    };
    
    data.current.map((matchId: string) => {
      const dayofWeek: string = isoDateStringToDayOfWeek(matchId.slice(0,-1));
      dayBuckets[dayofWeek] = dayBuckets[dayofWeek] + 1;
    });

    let daySeries: BarDatum[] = [];
    Object.keys(dayBuckets).map((dayofWeek: string) => {
      try {
        const day: BarDatum = {
          dayofWeek: dayofWeek,
          games: dayBuckets[dayofWeek],
        };
        daySeries.push(day);
      } catch (err) {
        console.error(err);
      }
    });
    
    return daySeries;
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
            indexBy="dayofWeek"
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
                legend: 'Day of the week',
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

export default DayChart;
