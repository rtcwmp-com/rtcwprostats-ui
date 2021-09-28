import { createContext } from "react";
import { IRegionTypeContext } from "./types";

const RegionTypeContext = createContext({
  region: "na",
  gametype: "6",
  setRegion: () => {},
  setGametype: () => {},
} as IRegionTypeContext);

export default RegionTypeContext;
