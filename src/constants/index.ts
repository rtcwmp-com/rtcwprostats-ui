import naSrc from "../assets/usa-flag.svg";
import euSrc from "../assets/eu-flag.svg";
import saSrc from "../assets/sa-flag.svg";
import unkSrc from "../assets/unk-flag.svg";

import frostbiteSrc from "../assets/maps/te_frostbite.png";
import beachSrc from "../assets/maps/mp_beach.png";
import iceSrc from "../assets/maps/mp_ice.png";
import ufoSrc from "../assets/maps/te_ufo.png";
import subSrc from "../assets/maps/mp_sub.png";

import { AiOutlineTrophy } from "react-icons/ai";
import { IoLogoGameControllerB } from "react-icons/io";
import { MdViewList } from 'react-icons/md';
import { VscAccount, VscServer } from "react-icons/vsc";

export const COLORS = {
  background: "#12161D",
};

export const LAST_RECENT_PLAYERS_NUM = 50;

export const COUNTRY_IMAGE_SOURCES = {
  na: naSrc,
  eu: euSrc,
  unk: unkSrc,
  sa: saSrc,
};

export const MAP_SOURCES = {
  mp_beach: beachSrc,
  te_frostbite: frostbiteSrc,
  mp_ice: iceSrc,
  mp_sub: subSrc,
  te_ufo: ufoSrc,
};

export const REGIONS = [
  { id: "na", name: "NA", longName: "North America" },
  { id: "eu", name: "EU", longName: "Europe" },
  { id: "sa", name: "SA", longName: "South America" },
];

export const GAME_TYPES = [
  { id: "3", name: "3v3" },
  { id: "6", name: "6v6" },
];

export const CATEGORIES = [
  { id: "elo", name: "ELO" },
  { id: "kdr", name: "KDR" },
  { id: "acc", name: "ACC" },
  { id: "killpeak", name: "KILLPEAK" },
];

export const NAV_LINKS = [
  { id: "leaders", name: "Leaders", component: AiOutlineTrophy },
  { id: "players", name: "Players", component: VscAccount },
  { id: "matches", name: "Matches", component: IoLogoGameControllerB },
  { id: "groups", name: "Groups", component: MdViewList },
  { id: "servers", name: "Servers", component: VscServer },
];

export const STAT_KEYS: Record<string, string> = {
  kills: "Kills",
  killpeak: "Kill Peak",
  gibs: "Gibs",
  obj_returned: "Objective Returned",
  accuracy: "Accuracy",
  obj_captured: "Objective Captured",
  damageteam: "Team Damage",
  knifekills: "Knife Kills",
  score: "Score",
  headshots: "Headshots",
  healthgiven: "Health Given",
  dyn_planted: "Dynamite Planted",
  games: "Games Played",
  damagegiven: "Damage Given",
  dyn_defused: "Dynamite Defused",
  deaths: "Total Deaths",
  obj_taken: "Objective Taken",
  efficiency: "Efficiency",
  poisoned: "Poisoned",
  revives: "Revives",
  hits: "Shots hit",
  teamkills: "Team kills",
  ammogiven: "Ammo Given",
  suicides: "Suicides",
  damagereceived: "Damage Received",
  shots: "Shots Fired",
  obj_destroyed: "Objective Destroyed",
};

export const SET_REGION = "SET_REGION";
export const SET_GAMETYPE = "SET_GAMETYPE";

export const API_BASE_URL = "https://rtcwproapi.donkanator.com";
