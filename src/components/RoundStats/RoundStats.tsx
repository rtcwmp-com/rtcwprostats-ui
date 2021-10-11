import React from "react";
import { ITeamOverviewData } from "../../api/types";
import RoundStatsTeamTable from "./RoundStatsTeamTable";

const RoundStats: React.FC<{ data: ITeamOverviewData | null }> = ({ data }) => {
  return (
    <>
      {data && (
        <>
          <RoundStatsTeamTable teamName="Team 1" teamData={data.a} />
          <RoundStatsTeamTable teamName="Team 2" teamData={data.b} />
        </>
      )}
    </>
  );
};

export default RoundStats;
