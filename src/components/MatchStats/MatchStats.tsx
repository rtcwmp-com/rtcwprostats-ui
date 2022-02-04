import React from "react";
import { IClasses, IElos, ITeamOverviewData } from "../../api/types";
import MatchStatsTeamTable from "./MatchStatsTeamTable";

const MatchStats: React.FC<{ data: ITeamOverviewData | null , displayHeader: boolean, elos: IElos, classes: IClasses}> = ({ data, displayHeader, elos, classes }) => {
  return (
    <>
      {data && (
        <>
          <MatchStatsTeamTable teamName="Team 1" teamData={data.a} displayHeader={displayHeader} elos={elos} classes={classes}/>
          { data.b.length > 0 && <MatchStatsTeamTable teamName="Team 2" teamData={data.b} displayHeader={displayHeader} elos={elos} classes={classes}/> }
        </>
      )}
    </>
  );
};

export default MatchStats;
