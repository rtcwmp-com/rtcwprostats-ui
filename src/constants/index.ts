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
import { GiRocket, GiMedicalPack, GiCrosshair, GiRank3, GiMineExplosion, GiCondorEmblem } from "react-icons/gi";
import { FaBinoculars, FaMountain } from "react-icons/fa";
import { BsQuestion } from "react-icons/bs";
import {
  IoLogoGameControllerB,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { MdViewList } from "react-icons/md";
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
  { id: "Killpeak", name: "KILLPEAK" },
  { id: "Longest Kill", name: "LONGEST KILL" },
  { id: "MegaKill", name: "MEGAKILL" },
  { id: "Kills Per Game", name: "KILLS/GAME" },
];

export const NAV_LINKS = [
  { id: "leaders", name: "Leaders", component: AiOutlineTrophy },
  { id: "players", name: "Players", component: VscAccount },
  { id: "matches", name: "Matches", component: IoLogoGameControllerB },
  { id: "groups", name: "Groups", component: MdViewList },
  { id: "servers", name: "Servers", component: VscServer },
  { id: "info", name: "Info", component: IoIosInformationCircleOutline },
];

export const CLASS_ICONS: Record<string, any> = {
   "Sniper": GiCrosshair,
   "LT": GiRank3,
   "Medic": GiMedicalPack,
   "Panzer": GiRocket,
   "Mixed": BsQuestion,
   "Unknown": BsQuestion
};

export const ACHIEVEMENT_DESCRIPTIONS: Record<string, any> = {
  "Killpeak": { description: "Kills achieved during one life.", icon: FaMountain, degrees: [8,10,12] },
  "Longest Kill": { description: "Farthest kill by distance between a killer and a victim.", icon: FaBinoculars, degrees: [3000,4000,5000] },
  "MegaKill": { description: "Number of kills in a 6s period.", icon: GiMineExplosion, degrees: [4,5,6] },
  "Kills Per Game": { description: "Number of kills in a AB match.", icon: GiCondorEmblem, degrees: [20,26,32] },
};

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

export const AWARD_DESCRIPTIONS: Record<string, string> = {
  "Best Engineer": "Most plants + defuses",
  "Best Medic": "Most revives + packs/4",
  "Confirmed Kill": "Most gibs",
  "Frag Stealer": "Least DMG per frag",
  "Frontliner": "First kill(2pt)/death(1pt) in a round",
  "Internal Enemy": "Most TKs",
  "Killer": "Most kills",
  "Longest Kill": "Longest kill by distance",
  "Man of Steel": "Most DMR per death",
  "MegaKill": "Most kills in 6 seconds",
  "Slow Bleeder": "Most DMG per frag",
  "Terminator": "Highest KDR",
  "Chicken": "Dying while not looking at the enemy (avg degrees)",
  "Backstabber": "Killing while enemy is looking the other way (avg degrees)",
  "Melon Farmer": "Most headshots",
  "On a Mission": "Objective taken + captured*2",
  "Standard bearer": "Flag captures and returns",
  "Bounty Hunter": "Objective returns"
};

export const SET_REGION = "SET_REGION";
export const SET_GAMETYPE = "SET_GAMETYPE";

export const API_BASE_URL = "https://rtcwproapi.donkanator.com";
