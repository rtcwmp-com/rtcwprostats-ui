import { AxiosInstance } from "axios";
import { pickData } from "../util";
import { Match, StatsResponse } from "./types";

export const createMatchesApi = (agent: AxiosInstance) => {
  return {
    Recent: async () => {
      return agent.get<Match[]>("/matches/recent").then(pickData);
    },
    MatchStats: async (matchId: string) => {
      return agent.get<StatsResponse>(`/stats/${matchId}`).then(pickData);
    },
  };
};
