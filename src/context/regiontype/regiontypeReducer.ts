import { SET_REGION, SET_GAMETYPE } from "../../constants";

import { IRegionTypeReducerAction, IRegionTypeState } from "../types";

const regionTypeReducer = (
  state: IRegionTypeState,
  action: IRegionTypeReducerAction
) => {
  switch (action.type) {
    case SET_REGION:
      // console.log("in SET_REGION REDUCER:" + action.payload);
      // console.log("current state.region is :" + state.region);
      return {
        ...state,
        region: action.payload,
      };
    case SET_GAMETYPE:
      // console.log("in SET_GAMETYPE REDUCER:" + action.payload);
      // console.log("current state.gametype is :" + state.gametype);
      return {
        ...state,
        gametype: action.payload,
      };
    default:
      return state;
  }
};

export default regionTypeReducer;
