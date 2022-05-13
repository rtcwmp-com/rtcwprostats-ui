import { AxiosInstance } from "axios";
import { pickData } from "../util";
import { IEventItem } from "../types";

export const createEventsApi = (agent: AxiosInstance) => {
  return {
    GetEvents: async () => {
      return agent.get<IEventItem[]>(`/events/100`).then(pickData); //100 is max
    },
  };
};
