import React, { useMemo, useEffect } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";

import { StatsApi } from "../../api";
import { IEloProgress } from "../../api/types";
import { Loading } from "../Loading";

import { Box } from "@chakra-ui/react";

import { Serie, Datum, ResponsiveLine, Point } from "@nivo/line";
import { BasicTooltip } from "@nivo/tooltip";
import { EloProgressDeltaLabel } from "./EloProgressDeltaLabel";
import { theme } from "./EloProgressTheme";

const EloProgress: React.FC<{
  gametype: string;
  region: string;
  playerId: string;
}> = ({ playerId, region, gametype }) => {
  const history = useHistory();

  const { data, isLoading, refetch } = useQuery<IEloProgress[]>(
    "eloprogress",
    () => StatsApi.Players.EloProgress(playerId, region, gametype)
  );

  useEffect(() => {
    refetch();
  }, [playerId, region, gametype]);

  const nivoData = useMemo(() => {
    if (!data || "error" in data) {
      return null;
    }

    let progression: Datum[] = [];
    data.map((eloProgress: IEloProgress) => {
      try {
        const event: Datum = {
          x: eloProgress.match_id,
          y: eloProgress.elo,
        };
        progression.push(event);
      } catch (err) {
        console.error(err);
      }
    });

    const realName = data[0].real_name == "" ? (data[data.length - 1].real_name == "" ? "NoRealName" : data[data.length - 1].real_name) : data[0].real_name;
    const serie: Serie[] = [{ id: realName, data: progression }];
    return serie;
  }, [data]);

  const onPointClick = (point: Point) => {
    if (point.data.x) {
      const matchId: string = point.data.x.toString();
      history.push(`/matches/${matchId}`);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {data && "error" in data && <>N/A</>}
      {data && nivoData && (
        <Box h={300}>
          <ResponsiveLine
            theme={theme}
            data={nivoData}
            colors={{ scheme: "orange_red" }}
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
            axisBottom={{
              tickSize: 0,
              format: () => {
                return "";
              },
            }}
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
            legends={[]}
            onClick={onPointClick}
            tooltip={({ point }) => {
              return (
                <BasicTooltip
                  id={
                    <span>
                      Match: {point.data.xFormatted} <br />
                      ELO: {point.data.yFormatted}{" "}
                      <EloProgressDeltaLabel
                        delta={data[point.index].value}
                      />
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

export default EloProgress;
