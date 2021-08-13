export type PlayerSearchResult = {
  real_name: string;
  guid: string;
  frequent_region: string;
};

export type PlayerDetails = {
  elos: Record<string, number>;
  real_name: string;
  stats_sum: {
    kills: number;
    killpeak: number;
    gibs: number;
    obj_returned: number;
    accuracy: number;
    obj_captured: number;
    damageteam: number;
    knifekills: number;
    score: number;
    headshots: number;
    healthgiven: number;
    dyn_planted: number;
    games: number;
    damagegiven: number;
    dyn_defused: number;
    deaths: number;
    obj_taken: number;
    efficiency: number;
    poisoned: number;
    revives: number;
    hits: number;
    teamkills: number;
    ammogiven: number;
    suicides: number;
    damagereceived: number;
    shots: number;
    obj_destroyed: number;
  };
  wstats_sum: {
    Knife: {
      kills: number;
      hits: number;
      games: number;
      headshots: number;
      shots: number;
      deaths: number;
    };
    "MP-40": {
      kills: number;
      hits: number;
      games: number;
      headshots: number;
      shots: number;
      deaths: number;
    };
    Dynamite: {
      kills: number;
      hits: number;
      games: number;
      headshots: number;
      shots: number;
      deaths: number;
    };
    Grenade: {
      kills: number;
      hits: number;
      games: number;
      headshots: number;
      shots: number;
      deaths: number;
    };
    Airstrike: {
      kills: number;
      hits: number;
      games: number;
      headshots: number;
      shots: number;
      deaths: number;
    };
    Artillery: {
      kills: number;
      hits: number;
      games: number;
      headshots: number;
      shots: number;
      deaths: number;
    };
    Thompson: {
      kills: number;
      hits: number;
      games: number;
      headshots: number;
      shots: number;
      deaths: number;
    };
    Mauser: {
      kills: number;
      hits: number;
      games: number;
      headshots: number;
      shots: number;
      deaths: number;
    };
  };
  player_guid: string;
};
