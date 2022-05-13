import axios from "axios";
import { API_BASE_URL } from "../constants";
import { createMatchesApi } from "./matches";
import { createPlayersApi } from "./players";
import { createServersApi } from "./servers";
import { createLeadersApi } from "./leaders";
import { createGroupsApi } from "./groups";
import { createEventsApi } from "./events";

const createStatsApi = () => {
  const agent = axios.create({ baseURL: API_BASE_URL });

  return {
    Matches: createMatchesApi(agent),
    Players: createPlayersApi(agent),
    Servers: createServersApi(agent),
    Leaders: createLeadersApi(agent),
    Groups: createGroupsApi(agent),
    Events: createEventsApi(agent),
  };
};

export const StatsApi = createStatsApi();
