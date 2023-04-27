import React from "react";
import { IClasses, IElos, ITeamOverviewData, IPlayerWStatsDictionary } from "../../api/types";
import MatchWeaponStatsTeamTable from "./MatchWeaponStatsTeamTable";

const MatchWeaponStats: React.FC<{ 
  wstatsall: IPlayerWStatsDictionary[]
  elos: IElos;
  classes: IClasses;
  names: any 
}> = ({ wstatsall, elos, classes, names }) => {
  return (
    <>
      {wstatsall && (
        <>
          <MatchWeaponStatsTeamTable wstatsall={wstatsall} elos={elos} classes={classes} names={names}/>
        </>
      )}
    </>
  );
};

export default MatchWeaponStats;
