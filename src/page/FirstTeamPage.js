import React from "react";
import FirstTeam from "../components/FirstTeam";
import {
	NavLink 
  } from "react-router-dom";
export default function FirstTeamPage() {
	return (
		<div className="text-center">
			<h1 className="text-center QATitle"> 夏季第一隊 </h1>
			<NavLink to="/DataExplain" className="nav-link me-lg-4">評分方式?</NavLink>
			<FirstTeam/>
		</div>
	);
}

