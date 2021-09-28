import { SET_REGION, SET_GAMETYPE } from "../constants";

import { IRegionTypeReducerAction, IRegionTypeState } from "./types";

const regionTypeReducer = (
  state: IRegionTypeState,
  action: IRegionTypeReducerAction
) => {
  switch (action.type) {
    case SET_REGION:
      return {
        ...state,
        region: action.payload,
      };
    case SET_GAMETYPE:
      return {
        ...state,
        gametype: action.payload,
      };
    default:
      return state;
  }
};

export default regionTypeReducer;
