import { AxiosInstance } from "axios";
import { pickData } from "../util";
import { PlayerDetails } from "./types";

export const createPlayersApi = (agent: AxiosInstance) => {
  return {
    ById: async (playerId: string) => {
      return agent.get<PlayerDetails[]>(`/player/${playerId}`).then(pickData);
    },
  };
};
