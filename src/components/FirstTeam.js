import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import {ServerIP} from "../Environment"

const server = ServerIP;

export default function FirstTeam() {
	const [Top, setTop] = useState({
		Teams: [],
		Players: [],
		Scores: [],
	});
	const [Jug, setJug] = useState({
		Teams: [],
		Players: [],
		Scores: [],
	});
	const [Mid, setMid] = useState({
		Teams: [],
		Players: [],
		Scores: [],
	});
	const [Adc, setAdc] = useState({
		Teams: [],
		Players: [],
		Scores: [],
	});
	const [Sup, setSup] = useState({
		Teams: [],
		Players: [],
		Scores: [],
	});
	

	let TableList = [];

	useEffect(() => {
		axiosGetChampionPick();
	}, []);
	const axiosGetChampionPick = () => {
		axios.get(server + "/PlayersAvg?Role=Top").then(function (res) {
			setTop(res.data);
		});
		axios.get(server + "/PlayersAvg?Role=Jungle").then(function (res) {
			setJug(res.data);
		});
		axios.get(server + "/PlayersAvg?Role=Mid").then(function (res) {
			setMid(res.data);
		});
		axios.get(server + "/PlayersAvg?Role=Bot").then(function (res) {
			setAdc(res.data);
		});
		axios.get(server + "/PlayersAvg?Role=Support").then(function (res) {
			setSup(res.data);
		});
	};
	for (let i = 0; i < 10; i++) {
		TableList.push(
			<tr>
				<th>
                    <div className="Ranking align-items-center">
                        {i+1}
                    </div>
                    </th>
				<th>
					{Top.Teams[i]}
					<br />
                    <div className="PlayerName">
                    {Top.Players[i]}
                    </div>
					<br />
                    <div className="PlayerScore">
					{Top.Scores[i]}
                    </div>
				</th>
				<th>
					{Jug.Teams[i]}
					<br />
					<div className="PlayerName">
                    {Jug.Players[i]}
                    </div>
					<br />
                    <div className="PlayerScore">
					{Jug.Scores[i]}
                    </div>
				</th>
				<th>
					{Mid.Teams[i]}
					<br />
					<div className="PlayerName">
                    {Mid.Players[i]}
                    </div>
					<br />
                    <div className="PlayerScore">
					{Mid.Scores[i]}
                    </div>
				</th>
				<th>
					{Adc.Teams[i]}
					<br />
					<div className="PlayerName">
                    {Adc.Players[i]}
                    </div>
					<br />
                    <div className="PlayerScore">
					{Adc.Scores[i]}
                    </div>
				</th>
				<th>
					{Sup.Teams[i]}
					<br />
					<div className="PlayerName">
                    {Sup.Players[i]}
                    </div>
					<br />
                    <div className="PlayerScore">
					{Sup.Scores[i]}
                    </div>
				</th>
			</tr>
		);
	}

	return (
		<Table striped bordered hover variant="dark">
			<thead>
				<tr>
					<th>#</th>
					<th>Top</th>
					<th>Jug</th>
					<th>Mid</th>
					<th>Adc</th>
					<th>Bot</th>
				</tr>
			</thead>
			<tbody>{TableList}</tbody>
		</Table>
	);
}
