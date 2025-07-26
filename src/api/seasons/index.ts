import { AxiosInstance } from "axios";
import { pickData } from "../util";
import { ISeason } from "../types";

export const createSeasonsApi = (agent: AxiosInstance) => {
  return {
    SeasonsByRegionType: async (region: string, gametype: string) => {
      return agent.get<ISeason[]>(`/seasons/region/${region}/type/${gametype}`).then(pickData);
    }
  };
};
