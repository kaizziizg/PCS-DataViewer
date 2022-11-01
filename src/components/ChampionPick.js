import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { ServerIP } from "../Environment";

const server = ServerIP;
export default function ChampionPick() {
	const [Data, setData] = useState({
		Champions: ["亞菲利歐"],
		Times: [1],
	});

	let TableList = [];

	useEffect(() => {
		axiosGetChampionPick();
	}, []);
	const axiosGetChampionPick = () => {
		axios.get(server + "/ChampionPick").then(function (res) {
			setData(res.data);
		});
	};
	for (let i = 0; i < 10; i++) {
		TableList.push(
			<tr>
				<th>{i + 1}</th>
				<th colSpan={2}>
					<div className="PlayerName">{Data.Champions[i + 10]}</div>
					<br />{" "}
					<div className="PlayerScore">{Data.Times[i + 10]}</div>
				</th>
				<th colSpan={2}>
					<div className="PlayerName">{Data.Champions[i + 20]}</div>
					<br />{" "}
					<div className="PlayerScore">{Data.Times[i + 20]}</div>
				</th>
				<th colSpan={2}>
					<div className="PlayerName">{Data.Champions[i + 30]}</div>
					<br />{" "}
					<div className="PlayerScore">{Data.Times[i + 30]}</div>
				</th>
				<th colSpan={2}>
					<div className="PlayerName">{Data.Champions[i + 0]}</div>
					<br />{" "}
					<div className="PlayerScore">{Data.Times[i + 0]}</div>
				</th>
				<th colSpan={2}>
					<div className="PlayerName">{Data.Champions[i + 40]}</div>
					<br />{" "}
					<div className="PlayerScore">{Data.Times[i + 40]}</div>
				</th>
			</tr>
		);
	}

	return (
		<Table striped bordered hover variant="dark">
			<thead>
				<tr>
					<th colSpan={2}>#</th>
					<th colSpan={2}>Top</th>
					<th colSpan={2}>Jug</th>
					<th colSpan={2}>Mid</th>
					<th colSpan={2}>Adc</th>
					<th colSpan={2}>Bot</th>
				</tr>
			</thead>
			<tbody>{TableList}</tbody>
		</Table>
	);
}
