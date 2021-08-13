export type ServerDetail = {
  server_name: string;
  region: "na" | "eu";
  last_submission: string;
  submissions: number;
  IP: string;
  data: {
    unixtime: string;
    jsonGameStatVersion: string;
    serverName: string;
    serverIP: string;
    gameVersion: string;
    g_customConfig: string;
    g_gametype: string;
    g_gameStatslog: string;
  };
};
