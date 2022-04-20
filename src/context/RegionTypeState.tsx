import React, { useReducer } from "react";
import { RegionTypeContext, regionTypeReducer } from ".";
import { SET_REGION, SET_GAMETYPE } from "../constants";

const RegionTypeState = ({ children }: { children: JSX.Element }) => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let region = params.get('region');
  let gametype = params.get('type');

  if (region == null) {
    region = "na";
  }
  if (gametype == null) {
    gametype = "6";
  }

  const initialState = {
    region: region,
    gametype: gametype,
  };

  const [state, dispatch] = useReducer(regionTypeReducer, initialState);

  // Set Region
  const setRegion = (text: string) => {
    dispatch({ type: SET_REGION, payload: text });
  };

  // Set Gametype
  const setGametype = (text: string) => {
    dispatch({ type: SET_GAMETYPE, payload: text });
  };

  return (
    <RegionTypeContext.Provider
      value={{
        region: state.region,
        setRegion,
        gametype: state.gametype,
        setGametype,
      }}
    >
      {children}
    </RegionTypeContext.Provider>
  );
};

export default RegionTypeState;
