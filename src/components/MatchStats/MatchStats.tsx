import React from "react";
import { ITeamOverviewData } from "../../api/types";
import MatchStatsTeamTable from "./MatchStatsTeamTable";

const MatchStats: React.FC<{ data: ITeamOverviewData | null , displayHeader: boolean}> = ({ data, displayHeader }) => {
  return (
    <>
      {data && (
        <>
          <MatchStatsTeamTable teamName="Team 1" teamData={data.a} displayHeader={displayHeader}/>
          { data.b.length > 0 && <MatchStatsTeamTable teamName="Team 2" teamData={data.b} displayHeader={displayHeader}/> }
        </>
      )}
    </>
  );
};

export default MatchStats;
