import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import RadarChart from "../components/RadarChart";
import axios from "axios";
import { ServerIP } from "../Environment";

const server = ServerIP;

export default function PlayerData() {
	return (
		<div>
			<PlayerTable />
		</div>
	);
}

function PlayerTable() {
	return (
		<Tabs
			defaultActiveKey="TOP"
			id="fill-tab-example"
			className="mb-3"
			fill
		>
			<Tab eventKey="TOP" title="TOP">
				<RoleRadar Role="Top" />
			</Tab>

			<Tab eventKey="JUG" title="JUG">
				<RoleRadar Role="Jungle" />
			</Tab>
			<Tab eventKey="MID" title="MID">
				<RoleRadar Role="Mid" />
			</Tab>
			<Tab eventKey="ADC" title="ADC">
				<RoleRadar Role="Bot" />
			</Tab>
			<Tab eventKey="SUP" title="SUP">
				<RoleRadar Role="Support" />
			</Tab>
		</Tabs>
	);
}

let color = [
	"rgb(54, 162, 235)",
	"rgb(255, 99, 132)",
	"rgb(128, 128, 105)",
	"rgb(255, 97, 3)",
	"rgb(255, 127, 80)",
	"rgb(255, 192, 203)",
	"rgb(227, 207, 87)",
	"rgb(106, 90, 205)",
	"rgb(64, 224, 208)",
	"rgb(8, 46, 84)",
	"rgb(138, 43, 226)",
	"rgb(218, 112, 214)",
	"rgb(11, 23, 70)",
	"rgb(0, 199, 140)",
	"rgb(227, 23, 13)",
	"rgb(94, 38, 18)",
];
let colora = [
	"rgba(54, 162, 235, 0.2)",
	"rgba(255, 99, 132, 0.2)",
	"rgba(128, 128, 105, 0.2)",
	"rgba(255, 97, 3, 0.2)",
	"rgba(255, 127, 80, 0.2)",
	"rgba(255, 192, 203, 0.2)",
	"rgba(227, 207, 87, 0.2)",
	"rgba(106, 90, 205, 0.2)",
	"rgba(64, 224, 208, 0.2)",
	"rgba(8, 46, 84, 0.2)",
	"rgba(138, 43, 226, 0.2)",
	"rgba(218, 112, 214, 0.2)",
	"rgba(11, 23, 70, 0.2)",
	"rgba(0, 199, 140, 0.2)",
	"rgba(227, 23, 13, 0.2)",
	"rgba(94, 38, 18, 0.2)",
];

function RoleRadar(Props) {
	const [Datas, setData] = useState([]);
	
	useEffect(() => {
		async function fetchData() {
			const result = await axios.get(
				server + "/RoleScore?Role=" + Props.Role
			);
			setData(result.data);
		}
		fetchData();
	}, []);

	return (
		<div className="row">
			{Datas.map((data,index) => (
				<div
					className="Radar col-md-6 col-xl-3"
					style={{ padding: "3rem" }}
				>
					<SingleRadar id={index} Team={data.Team} Player={data.Player} KDA={data.KDA}  EGPM={data.EGPM} DPM={data.DPM} FBP={data.FBP} KP={data.KP}  GD10={data.GD10} XPD10={data.XPD10} CSD10={data.CSD} />
				</div>
			))}
		</div>
	);
}

function SingleRadar(Props) {
	const data = {
		labels: ["KDA", "EGPM", "DPM", "FBP", "KP", "GD10", "XPD10", "CSD10"],
		datasets: [
			{
				label: Props.Team + " " + Props.Player,
				data: [Props.KDA, Props.EGPM,Props.DPM,Props.FBP,Props.KP,Props.GD10,Props.XPD10,Props.CSD10],
				fill: true,
				backgroundColor: colora[Props.id % 16],
				borderColor: color[Props.id % 16],
				pointBackgroundColor: color[Props.id % 16],
				pointBorderColor: "#fff",
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: color[Props.id % 16],
			},
		],
	};
	return <RadarChart chartData={data} />;
}

