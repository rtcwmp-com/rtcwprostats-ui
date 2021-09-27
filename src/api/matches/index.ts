import { AxiosInstance } from "axios";
import { pickData } from "../util";
import { IMatch, IServersAPIParams, IStatsResponse } from "../types";

export const createMatchesApi = (agent: AxiosInstance) => {
  return {
    Recent: async (params: IServersAPIParams) => {
      let dict_ = params["queryKey"][1];
      // console.log(dict_);

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
    MatchStats: async (matchId: string) => {
      return agent.get<IStatsResponse>(`/stats/${matchId}`).then(pickData);
    },
  };
};
