import React, { useReducer } from 'react';
import axios from 'axios';
import RegiontypeContext from './regiontypeContext';
import RegiontypeReducer from './regiontypeReducer';
import {
  SET_REGION,
  SET_GAMETYPE
} from '../types';

const RegiontypeState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
	region: 'na',
	gametype: '6'
  };

  const [state, dispatch] = useReducer(RegiontypeReducer, initialState);
  
  // Set Region
  const setRegion = (text: string) => {
	  // console.log("State setRegion function got param: " + text);
	  dispatch({ type: SET_REGION, payload: text });
  }
  
  // Set Gametype
  const setGametype = (text: string) => {
	  // console.log("State setGametype function got param: " + text);
	  dispatch({ type: SET_GAMETYPE, payload: text });
  }

  return (
    <RegiontypeContext.Provider value={ {
		region: state.region,
		setRegion,
		gametype: state.gametype,
		setGametype
      } }>
      {props.children}
    </RegiontypeContext.Provider>
  );
};

export default RegiontypeState;