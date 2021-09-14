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


export type ServerSimple = {
  server_name: string;
  region: "na" | "eu" | "sa" | "unk";
  last_submission: string;
  submissions: number;
  IP: string;
};

/* 2021-09-14
{
server_name: "Virginia RtCWPro na",
region: "na",
last_submission: "2021-09-14 06:30:14",
submissions: 479,
IP: "3.235.76.221"
},
*/