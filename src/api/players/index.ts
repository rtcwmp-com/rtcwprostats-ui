import { AxiosInstance } from "axios";
import { pickData } from "../util";
import { IRecentPlayer, IPlayerDetails } from "../types";

export const createPlayersApi = (agent: AxiosInstance) => {
  return {
    ById: async (playerId: string) => {
      return agent.get<IPlayerDetails>(`/player/${playerId}`).then(pickData);
    },
    RecentThirty: async (limit: number) => {
      return agent
        .get<IRecentPlayer[]>(`/aliases/recent/limit/${limit}`)
        .then(pickData);
    },
  };
};
