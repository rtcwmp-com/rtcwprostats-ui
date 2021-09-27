export interface IRegionTypeReducerAction {
  type: string;
  payload: string;
}

export interface IRegionTypeState {
  region: string;
  gametype: string;
}

export interface IRegionTypeContext {
  region: string;
  gametype: string;
  setRegion: Function;
  setGametype: Function;
}
