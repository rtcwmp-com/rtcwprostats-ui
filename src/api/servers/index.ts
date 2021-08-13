import { AxiosInstance } from "axios";
import { pickData } from "../util";
import { ServerDetail } from "./types";

export const createServersApi = (agent: AxiosInstance) => {
  return {
    GetDetails: async () => {
      return agent.get<ServerDetail[]>(`/servers/detail`).then(pickData);
    },
  };
};
