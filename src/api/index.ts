import axios from "axios";
import { API_BASE_URL } from "../constants";
import { createMatchesApi } from "./matches";
import { createPlayersApi } from "./players";

const createStatsApi = () => {
  const agent = axios.create({ baseURL: API_BASE_URL });

  return {
    Matches: createMatchesApi(agent),
    Players: createPlayersApi(agent),
  };
};

export const StatsApi = createStatsApi();
