import React from "react";
import FirstTeam from "../components/FirstTeam";
import {
	NavLink 
  } from "react-router-dom";
export default function FirstTeamPage() {
	return (
		<div className="text-center">
			<h1 className="text-center QATitle"> 夏季第一隊 </h1>
			<NavLink to="/DataExplain" className="nav-link" style={{fontWeight:'bold',fontSize:'1.5rem',color:'gray',marginBottom:'1rem'}}>如何評分?</NavLink>
			<FirstTeam/>
		</div>
	);
}

