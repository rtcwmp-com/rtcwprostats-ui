import React from "react";
import { ITeamOverviewData } from "../../api/types";
import MatchStatsTeamTable from "./MatchStatsTeamTable";

const MatchStats: React.FC<{ data: ITeamOverviewData | null }> = ({ data }) => {
  return (
    <>
      {data && (
        <>
          <MatchStatsTeamTable teamName="Team 1" teamData={data.a} />
          <MatchStatsTeamTable teamName="Team 2" teamData={data.b} />
        </>
      )}
    </>
  );
};

export default MatchStats;
