import React, { useMemo, useEffect } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";

import { IMatchHealthResponse } from "../../api/types";

import { Box } from "@chakra-ui/react";

import { Serie, Datum, ResponsiveLine, Point } from "@nivo/line";
import { BasicTooltip } from "@nivo/tooltip";
import { theme } from "./MatchHealthTheme";
import { isoDateStringToDayBack } from "../../util";

const MatchHealth: React.FC<{
  data: IMatchHealthResponse
}> = ({ data }) => {
  const history = useHistory();

  function fillSeries(dataPeriod: string[], daysOffset: number) {
    let matchesDatum: Datum[] = [];

    type matchBucketsInterface = {
      [match: string]: number
    }
    let matchBuckets: matchBucketsInterface = {};
    dataPeriod.map((matchId: string) => {
      const day = isoDateStringToDayBack(matchId, daysOffset);
      //const dayStr = day.toString();
      if (day in matchBuckets) {
        matchBuckets[day] = matchBuckets[day] + 1;
      }
      else {
        matchBuckets[day] = 1;
      }
    });

    for (let day = 0; day < 29; day++) {
      if (!(day in matchBuckets)) {
        matchBuckets[day] = 0;
      }
    }

    
    Object.keys(matchBuckets).map((day: string) => {
      try {
        const event: Datum = {
          x: day,
          y: matchBuckets[day],
        };
        matchesDatum.push(event);
      } catch (err) {
        console.error(err);
      }
    });
    return matchesDatum;
  }

  // https://nivo.rocks/line/
  const nivoData = useMemo(() => {
    if (!data || "error" in data) {
      return null;
    }

    const currentMatches = fillSeries(data.current, 0);
    const lastMonthMatches = fillSeries(data.last_month, 35);
    const lastYearMonthMatched = fillSeries(data.last_year_month, 52*7);

    const serie: Serie[] = [{ id: "Current", data: currentMatches },
                            { id: "Last Month", data: lastMonthMatches },
                            { id: "Year ago", data: lastYearMonthMatched }];
    return serie;
  }, [data]);

  return (
    <>
      {data && "error" in data && <>N/A</>}
      {data && nivoData && (
        <Box h={300}>
          <ResponsiveLine
            theme={theme}
            data={nivoData}
            colors={{ scheme: "category10" }}
            xScale={{ type: 'point' }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            margin={{ top: 5, right: 40, bottom: 30, left: 40 }}
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={{
              tickValues: 10,
            }}
            curve="monotoneX"
            enableGridX={false}
            enableCrosshair={false}
            pointSize={4}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            motionConfig="molasses"
            legends={[
              {
                  anchor: 'top-right',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemBackground: 'rgba(0, 0, 0, .03)',
                              itemOpacity: 1
                          }
                      }
                  ]
              }
            ]}
            tooltip={({ point }) => {
              return (
                <BasicTooltip
                  id={
                    <span>
                      DaySequence: {point.data.xFormatted} <br />
                      Matches: {point.data.yFormatted}{" "}
                    </span>
                  }
                  enableChip={false}
                  color={point.serieColor}
                />
              );
            }}
          />
        </Box>
      )}
    </>
  );
};

export default MatchHealth;
