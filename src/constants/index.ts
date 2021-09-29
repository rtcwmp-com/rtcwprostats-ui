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
import { VscListFlat, VscAccount, VscServer } from "react-icons/vsc";

export const COLORS = {
  background: "#12161D",
};

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
  { id: "na", name: "NA" },
  { id: "eu", name: "EU" },
  { id: "sa", name: "SA" },
];

export const GAME_TYPES = [
  { id: "3", name: "3v3" },
  { id: "6", name: "6v6" },
];

export const CATEGORIES = [
  { id: "elo", name: "ELO" },
  { id: "kdr", name: "KDR" },
  { id: "acc", name: "ACC" },
];

export const NAV_LINKS = [
  { id: "matches", name: "Matches", component: IoLogoGameControllerB },
  { id: "players", name: "Players", component: VscAccount },
  { id: "servers", name: "Servers", component: VscServer },
  { id: "leaders", name: "Leaders", component: AiOutlineTrophy },
];

export const SET_REGION = "SET_REGION";
export const SET_GAMETYPE = "SET_GAMETYPE";

export const API_BASE_URL = "https://rtcwproapi.donkanator.com";
