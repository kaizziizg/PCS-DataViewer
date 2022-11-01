import React from "react";
import PlayerData from "../components/PlayerData";
import {
	NavLink 
  } from "react-router-dom";

export default function PlayerDataPage() {

	return (
		<div className="text-center">
			<h1 className="text-center QATitle"> 選手數據 </h1>
			<NavLink to="/DataExplain" className="nav-link" style={{fontWeight:'bold',fontSize:'1.5rem',color:'gray',marginBottom:'1rem'}}>如何評分?</NavLink>
			<PlayerData/>
		</div>
	);
}
