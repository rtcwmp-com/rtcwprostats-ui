import React from "react";
import { IElos, ITeamOverviewData } from "../../api/types";
import MatchStatsTeamTable from "./MatchStatsTeamTable";

const MatchStats: React.FC<{ data: ITeamOverviewData | null , displayHeader: boolean, elos: IElos}> = ({ data, displayHeader, elos }) => {
  return (
    <>
      {data && (
        <>
          <MatchStatsTeamTable teamName="Team 1" teamData={data.a} displayHeader={displayHeader} elos={elos}/>
          { data.b.length > 0 && <MatchStatsTeamTable teamName="Team 2" teamData={data.b} displayHeader={displayHeader} elos={elos}/> }
        </>
      )}
    </>
  );
};

export default MatchStats;
