import React, { Fragment, useContext, useState } from 'react'
import { AxiosInstance } from "axios";
import { pickData } from "../util";
import { ServerDetail, ServerSimple } from "./types";
import RegiontypeContext from '../../context/regiontype/regiontypeContext';

export const createServersApi = (agent: AxiosInstance) => {
   
  return {
    GetDetails: async (region: string) => {
	  const region_value = region["queryKey"][1];
	  if (region_value == null) {
		return agent.get<ServerSimple[]>(`/servers`).then(pickData);
	  }
	  else {
		return agent.get<ServerSimple[]>(`/servers/region/${region_value}/active`).then(pickData); 
	  }
	  
	  
    },
  };
};
