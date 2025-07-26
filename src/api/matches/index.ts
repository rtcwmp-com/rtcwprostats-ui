import { AxiosInstance } from "axios";
import { pickData } from "../util";
import { IMatch, IServersAPIParams, IStatsResponse, IMatchHealthResponse } from "../types";

export const createMatchesApi = (agent: AxiosInstance) => {
  return {
    Recent: async (params: IServersAPIParams) => {
      let dict_ = params["queryKey"][1];

      if (dict_["serverId"]) {
        return agent
          .get<IMatch[]>("/matches/server/" + dict_["serverId"])
          .then(pickData);
      } else if (dict_["region"] != null) {
        if (dict_["gametype"] != null) {
          return agent
            .get<IMatch[]>(
              "/matches/type/" + dict_["region"] + "/" + dict_["gametype"]
            )
            .then(pickData);
        } else {
          return agent
            .get<IMatch[]>("/matches/type/" + dict_["region"] + "/6")
            .then(pickData);
        }
      } else {
        return agent.get<IMatch[]>("/matches/recent/6").then(pickData);
      }
    },
    MatchStats: async (matchId: string, group: boolean) => {
      if (group) {
        return agent.get<IStatsResponse>(`/stats/group/${matchId}`).then(pickData);
      }
      else {
        return agent.get<IStatsResponse>(`/stats/${matchId}`).then(pickData);
      }
    },
    MatchRecentDays: async (days: number) => {
        return agent.get<IMatch[]>(`/matches/recent/${days}`).then(pickData);
    },
    MatchHealthAPI: async (region: string, gametype: string) => {
      return agent.get<IMatchHealthResponse>(`/matches/health/${region}/${gametype}`).then(pickData);
    }
  };
};