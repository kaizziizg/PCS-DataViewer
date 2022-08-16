import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";


export default function ChampionPickPage() {
	return (
		<div className="text-center">
			<DarkExample />
		</div>
	);
}

function DarkExample() {
	const [Data, setData] = useState({
		Champions: ["亞菲利歐"],
		Times: [1],
	});
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
				<th>{i+1}</th>
				
				<th>{Data.Champions[i+10]} : {Data.Times[i+10]}</th>
				<th>{Data.Champions[i+20]}: {Data.Times[i+20]}</th>
				<th>{Data.Champions[i+30]}: {Data.Times[i+30]}</th>
				<th>{Data.Champions[i]}: {Data.Times[i]}</th>
				<th>{Data.Champions[i+40]}: {Data.Times[i+40]}</th>
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
			<tbody>
				{TableList}
			</tbody>
		</Table>
	);
}
