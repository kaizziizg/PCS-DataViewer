import React, { useEffect, useState } from "react";
import PlayerData from "../components/PlayerData";


export default function PlayerDataPage() {

	return (
		<div className="text-center">
			<h1 className="text-center QATitle"> 選手數據 </h1>
			<PlayerData/>
		</div>
	);
}
