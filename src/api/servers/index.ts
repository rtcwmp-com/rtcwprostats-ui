import { AxiosInstance } from "axios";
import { pickData } from "../util";
import { IServerSimple, IServersAPIParams } from "../types";

export const createServersApi = (agent: AxiosInstance) => {
  return {
    GetDetails: async (region: IServersAPIParams) => {
      const region_value = region["queryKey"][1];
      if (region_value == null) {
        return agent.get<IServerSimple[]>(`/servers`).then(pickData);
      } else {
        return agent
          .get<IServerSimple[]>(`/servers/region/${region_value}/active`)
          .then(pickData);
      }
    },
  };
};
