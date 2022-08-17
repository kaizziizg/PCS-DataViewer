import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

export default function ChampionPick() {
	const [Data, setData] = useState({
		Champions: ["亞菲利歐"],
		Times: [1],
	});
	console.log(Data);

	let TableList = [];

	useEffect(() => {
		axiosGetChampionPick();
	}, []);
	const axiosGetChampionPick = () => {
		axios.get("http://127.0.0.1/ChampionPick").then(function (res) {
			setData(res.data);
		});
	};
	for (let i = 0; i < 10; i++) {
		TableList.push(
			<tr>
				<th>{i + 1}</th>
				<th colSpan={2}>
					{Data.Champions[i + 10]} <br /> {Data.Times[i + 10]}
				</th>
				<th colSpan={2}>
					{Data.Champions[i + 20]}
					<br /> {Data.Times[i + 20]}
				</th>
				<th colSpan={2}>
					{Data.Champions[i + 30]}
					<br /> {Data.Times[i + 30]}
				</th>
				<th colSpan={2}>
					{Data.Champions[i]}
					<br /> {Data.Times[i]}
				</th>
				<th colSpan={2}>
					{Data.Champions[i + 40]}
					<br /> {Data.Times[i + 40]}
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
