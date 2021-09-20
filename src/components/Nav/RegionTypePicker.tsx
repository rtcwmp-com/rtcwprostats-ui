import React, { Fragment, useContext, useState } from 'react'
import RegiontypeContext from '../../context/regiontype/regiontypeContext';

export const RegionTypePicker: React.FC = () => {
   
  const regiontypeContext = useContext(RegiontypeContext);
  const { region, gametype } = regiontypeContext;
	
  const onClickRegion = e => {
	  regiontypeContext.setRegion(e.target.value);
	  //console.log("Clicked " + e.target.value);
  }
  
  const onClickGametype = e => {
	  regiontypeContext.setGametype(e.target.value);
	  // console.log("Clicked " + e.target.value);
  }
  
  // console.log("From context - region   " + region);
  // console.log("From context - gametype " + gametype);
  
  return (
  <div className='filter'>
    <div className='horizontal'>
		<button className={`btn ${region === 'na' ? 'btn-highlight' : 'btn-dark'} btn-block btn-regiongametype`} value='na' onClick={onClickRegion}>NA</button>
		<button className={`btn ${region === 'eu' ? 'btn-highlight' : 'btn-dark'} btn-block btn-regiongametype`} value='eu'onClick={onClickRegion}>EU</button>
		<button className={`btn ${region === 'sa' ? 'btn-highlight' : 'btn-dark'} btn-block btn-regiongametype`} value='sa'onClick={onClickRegion}>SA</button>
	</div>
	<div className='horizontal'>
		<button className={`btn ${gametype === '3' ? 'btn-highlight' : 'btn-dark'} btn-block btn-regiongametype`} value='3'onClick={onClickGametype}>3v3</button>
		<button className={`btn ${gametype === '6' ? 'btn-highlight' : 'btn-dark'} btn-block btn-regiongametype`} value='6'onClick={onClickGametype}>6v6</button>
	</div>
  </div>
  );
};
