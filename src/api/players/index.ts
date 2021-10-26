import { AxiosInstance } from "axios";
import { pickData } from "../util";
import {
  IRecentPlayer,
  IPlayerDetails,
  IPlayerSearchResult,
  IPlayerStats,
  IPlayerAlias,
  IEloProgress
} from "../types";

export const createPlayersApi = (agent: AxiosInstance) => {
  return {
    ById: async (playerId: string) => {
      return agent.get<IPlayerDetails>(`/player/${playerId}`).then(pickData);
    },
    RecentPlayers: async (limit: number) => {
      return agent
        .get<IRecentPlayer[]>(`/aliases/recent/limit/${limit}`)
        .then(pickData);
    },
    Aliases: async (playerId: string) => {
      return agent
        .get<IPlayerAlias[]>(`/aliases/player/${playerId}`)
        .then(pickData);
    },
    Search: async (partialName: string) => {
      return agent
        .get<IPlayerSearchResult[]>(`/player/search/${partialName}`)
        .then(pickData);
    },
    Stats: async (playerId: string) => {
      return agent
        .get<IPlayerStats[]>(`/stats/player/${playerId}`)
        .then(pickData);
    },
    EloProgress: async (playerId: string, region: string, gametype: string) => {
      return agent
        .get<IEloProgress[]>(`/eloprogress/player/${playerId}/region/${region}/type/${gametype}`)
        .then(pickData)
        .then((eloProgress: IEloProgress[]) => !("error" in eloProgress) ? eloProgress.reverse() : eloProgress );
    }
  };
};
