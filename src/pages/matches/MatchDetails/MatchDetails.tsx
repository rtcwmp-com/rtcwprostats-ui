import React, { useState } from "react";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { StatsApi } from "../../../api";
import { deriveAwardsfromStats } from "../../../util/awards-calc";
import {
  IPlayerStatsWithId,
  IStatsResponse,
  ITeamOverviewData,
  IElos,
  IClasses,
  IPlayerWStatsDictionary,
  IPlayerStatsDictionary
} from "../../../api/types";
import { Loading } from "../../../components/Loading";
import { MatchDetailsContent } from "./MatchDetailsContent";
import { PageTitle } from "../../../components/PageTitle";
import { MatchStats } from "../../../components/MatchStats";
import { MatchWeaponStats } from "../../../components/MatchWeaponStats";
import { AwardsDisplay } from "../../../components/AwardsDisplay/AwardsDisplay";
import { FeudsDisplay } from "../../../components/FeudsDisplay/FeudsDisplay";
import { Button } from "@chakra-ui/react";

export const MatchDetails: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const { groupId } = useParams<{ groupId: string }>();

  const statsParam = matchId ? matchId : groupId;
  const statsParamType = matchId ? "Match" : "Group";
  const groupFlag = matchId ? false : true;
  const [statsType, setStatsType] = useState("stats");

  const { data, isLoading } = useQuery<IStatsResponse>(
    statsParam,
    () => StatsApi.Matches.MatchStats(statsParam, groupFlag)
  );
  
  let awards = {};
  let elos: any = null;
  let classes: any = null;
  let names: any = {};
  let wstatsall: any = null;
  if (data) {
    elos = data.elos == null ? null : data.elos;
    classes = data.classes == null ? null : data.classes;
    data.statsall.map((player: IPlayerStatsDictionary) => {
      const guid = Object.keys(player)[0];
      const alias = player[guid].alias;
      names[guid] = alias;
    });
    wstatsall = data.wstatsall;
    
    const awardsFromStats = deriveAwardsfromStats(data, elos);
    
    let awardsFromGamelog = {};
    if ("awards" in data) {
      awardsFromGamelog = data.awards;
    }
    awards = {...awardsFromGamelog,...awardsFromStats}
  }

  const actualData = useMemo(() => {
    if (!data) {
      return null;
    }

    if (statsType == "wstats") {
      return null;
    }

    return data.statsall.reduce(
      (acc, item) => {
        const playerId = Object.keys(item)[0];
        const player: IPlayerStatsWithId = {
          ...item[playerId],
          playerId,
        };
        const gametype = parseInt(data.type.split("#")[0]);
        const displayLimit = gametype === 3 ? 7 : 15;
        const displayAllTeams = data.statsall.length < displayLimit;

        if (displayAllTeams) {
          //mindfk: in a single match, the team that starts as allies is always team A
          //so by the end of round AB it's team Axis. So Axis is really A to begin with.
          if (player.team === "Axis" || player.team === "TeamA") {
            acc.a.push(player);
          } else {
            acc.b.push(player);
          }
        } else {
          acc.a.push(player);
        }

        return acc;
      },
      { a: [], b: [] } as ITeamOverviewData
    );
  }, [data]);

  const onClickStatsType = (e: React.MouseEvent<HTMLButtonElement>) => {
    const element = e.currentTarget as HTMLButtonElement;
    setStatsType(element.value);
  };

  return (
    <>
      <PageTitle>Match Report</PageTitle>
      {isLoading && <Loading />}
      {data && !("error" in data) && (
        <>
          <Button
            key={12323}
            size="sm"
            isActive={statsType === "stats"}
            value={"stats"}
            onClick={onClickStatsType}
            m="0 5px 5px"
          >
            {"Stats"}
          </Button>
          <Button
            key={123233}
            size="sm"
            isActive={statsType === "wstats"}
            value={"wstats"}
            onClick={onClickStatsType}
            m="0 5px 5px"
          >
            {"Weapons"}
          </Button>
          {statsType == "stats" && (
            <MatchDetailsContent
              data={actualData}
              matchSummary={data.match_summary}
              statsParamType={statsParamType}
              statsParam={statsParam}
            />
          )}
          {statsType == "stats" && actualData && (
            <MatchStats
              data={actualData}
              displayHeader={actualData.b.length > 0}
              elos={elos}
              classes={classes}
            />
          )}
          {statsType == "wstats" && wstatsall && (
            <MatchWeaponStats wstatsall={wstatsall} elos={elos} classes={classes} names={names} />
          )}
          {statsType == "stats" && "match_summary" in data && (<AwardsDisplay data={awards} />)}
          {statsType == "stats" && "top_feuds" in data && (<FeudsDisplay feuds={data.top_feuds} />)}
        </>
      )}
    </>
  );
};
