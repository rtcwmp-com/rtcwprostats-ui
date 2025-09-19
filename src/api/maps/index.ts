import { AxiosInstance } from "axios";
import { pickData } from "../util";
import { IMapsAllItem } from "../types";

export const createMapsApi = (agent: AxiosInstance) => {
  return {
    GetAllMapStats: async (region: string, gametype: string) => {
      return agent.get<IMapsAllItem[]>(`/mapstats/region/${region}/type/${gametype}/all`).then(pickData);
    }
  };
};
