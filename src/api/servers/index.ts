import { AxiosInstance } from "axios";
import { pickData } from "../util";
import { ServerDetail, ServerSimple } from "./types";

export const createServersApi = (agent: AxiosInstance) => {
  return {
    GetDetails: async () => {
      //return agent.get<ServerDetail[]>(`/servers/detail`).then(pickData);
	  return agent.get<ServerSimple[]>(`/servers/region/eu/active`).then(pickData);
    },
  };
};
