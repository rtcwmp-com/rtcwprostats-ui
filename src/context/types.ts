export interface IRegionTypeReducerAction {
  type: string;
  payload: object;
}
export interface IRegionTypeContext {
  region: string;
  gametype: string;
  setRegion: Function;
  setGametype: Function;
}
