import { AxiosInstance } from "axios";
import { pickData } from "../util";
import { Match } from "./types";

export const createMatchesApi = (agent: AxiosInstance) => {
  return {
    Recent: async () => {
      return agent.get<Match[]>("/matches/recent").then(pickData);
    },
  };
};
