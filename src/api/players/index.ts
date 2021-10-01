import { AxiosInstance } from "axios";
import { pickData } from "../util";
import { IPlayerDetails } from "../types";

export const createPlayersApi = (agent: AxiosInstance) => {
  return {
    ById: async (playerId: string) => {
      return agent.get<IPlayerDetails>(`/player/${playerId}`).then(pickData);
    },
    RecentThirty: async () => {
      return agent.get<IPlayerDetails[]>("/players/recent").then(pickData);
    },
  };
};
