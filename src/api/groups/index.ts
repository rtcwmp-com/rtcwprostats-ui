import { AxiosInstance, AxiosRequestConfig } from "axios";
import { pickData } from "../util";
import { IGroupInput, IGroupResponse, IServersAPIParams, IStatsResponse } from "../types";

export const createGroupsApi = (agent: AxiosInstance) => {
  return {
    RegionType: async (params: IServersAPIParams) => {
      let dict_ = params["queryKey"][1];
      let region = dict_["region"];
      let gametype = dict_["gametype"];

      if (region == null) {
        region = "na";
      }
      if (gametype == null) {
        region = "6";
      }

      return agent
        .get<IGroupResponse>(
          "/groups/region/" + region + "/type/" + gametype
        )
        .then(pickData);
        },
    GroupStats: async (groupName: string) => {
      return agent.get<IStatsResponse>(`/stats/${groupName}`).then(pickData);
    },
    CreateGroup: async (input: IGroupInput) => {
      const config: AxiosRequestConfig = {
        headers: {
          "x-api-key": "rtcwproapikeythatisjustforbasicauthorization"
        }
      };
      return agent.post<any>(`/groups/add`, input, config).then(pickData);
    }
  };
};
