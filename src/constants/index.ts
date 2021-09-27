import naSrc from "../assets/usa-flag.svg";
import euSrc from "../assets/eu-flag.svg";
import saSrc from "../assets/sa-flag.svg";
import unkSrc from "../assets/unk-flag.svg";

import frostbiteSrc from "../assets/maps/te_frostbite.png";
import beachSrc from "../assets/maps/mp_beach.png";
import iceSrc from "../assets/maps/mp_ice.png";
import ufoSrc from "../assets/maps/te_ufo.png";
import subSrc from "../assets/maps/mp_sub.png";

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

export const SET_REGION = "SET_REGION";
export const SET_GAMETYPE = "SET_GAMETYPE";

export const API_BASE_URL = "https://rtcwproapi.donkanator.com";
