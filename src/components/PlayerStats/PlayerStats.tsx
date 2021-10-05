import React, { useContext } from "react";
import { RegionTypeContext } from "../../context";

import { IPlayerDetails } from "../../api/types";
import { REGIONS, GAME_TYPES, STAT_KEYS } from "../../constants";

const PlayerWrapper: React.FC<{ data: IPlayerDetails }> = ({ data }) => {
  const rTypeContext = useContext(RegionTypeContext);
  const { region, gametype } = rTypeContext; //region: 'na', gametype: '6'
  const regionKey = `${region}#${gametype}`;

  const { elos = {}, aggstats = {}, kdr = {}, acc = {} } = data;
  const { [regionKey]: eloRegion } = elos;
  const { [regionKey]: aggStatsRegion } = aggstats;
  const { [regionKey]: kdrRegion } = kdr;
  const { [regionKey]: accRegion } = acc;

  const regionTitle = REGIONS.find((item) => item.id === region)?.longName;
  const gameTypeTitle = GAME_TYPES.find((item) => item.id === gametype)?.name;

  // TODO: Need to figure out how/what to actually display
  return (
    <>
      <h3>{`Lifetime stats for ${regionTitle} ${gameTypeTitle}`}</h3>
      <p>Elo: {eloRegion && eloRegion.elo}</p>
      <p>KDR: {kdrRegion && kdrRegion}</p>
      <p>Accuracy: {accRegion && accRegion}</p>
      {aggStatsRegion &&
        Object.keys(aggStatsRegion).map((item) => {
          const keyName = STAT_KEYS[item];
          const val = aggStatsRegion[item];
          return <p key={item}>{`${keyName}: ${val}`}</p>;
        })}
    </>
  );
};

export default PlayerWrapper;
