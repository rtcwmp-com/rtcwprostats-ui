import { createContext } from "react";
import { IRegionTypeContext } from "../types";

const RegionTypeContext = createContext({
  region: "unk",
  gametype: "sw",
  setRegion: () => {},
  setGametype: () => {},
} as IRegionTypeContext);

export default RegionTypeContext;
