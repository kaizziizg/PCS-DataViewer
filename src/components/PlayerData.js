import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import RadarChart from "../components/RadarChart";
import BarChart from "../components/BarChart";

export default function PlayerData() {
	return (
		<div>
			<PlayerTable />
		</div>
	);
}

function PlayerTable() {
	const [userData, setUserData] = useState({
		labels: [
			"Eating",
			"Drinking",
			"Sleeping",
			"Designing",
			"Coding",
			"Cycling",
			"Running",
		],
		datasets: [
			{
				label: "My First Dataset",
				data: [65, 59, 90, 81, 56, 55, 40],
				fill: true,
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgb(255, 99, 132)",
				pointBackgroundColor: "rgb(255, 99, 132)",
				pointBorderColor: "#fff",
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: "rgb(255, 99, 132)",
			},
			{
				label: "My Second Dataset",
				data: [28, 48, 40, 19, 96, 27, 100],
				fill: true,
				backgroundColor: "rgba(54, 162, 235, 0.2)",
				borderColor: "rgb(54, 162, 235)",
				pointBackgroundColor: "rgb(54, 162, 235)",
				pointBorderColor: "#fff",
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: "rgb(54, 162, 235)",
			},
		],
	});
	return (
		<Tabs
			defaultActiveKey="TOP"
			id="fill-tab-example"
			className="mb-3"
			fill
		>
			<Tab eventKey="TOP" title="TOP">
				<div className="row text-center">
					<div className="col-1"></div>
					<div className="col-md-6 col-3">
						<RadarChart chartData={userData} />
					</div>
					<div className="col-1"></div>
					<div className="col-md-6 col-3">
						<RadarChart chartData={userData} />
					</div>
					<div className="col-1"></div>
					<div className="col-md-6">
						<RadarChart chartData={userData} />
					</div>
					<div className="col-1"></div>
				</div>

				<div className="row">
					<div className="col-1"></div>
					<div className="col-md-6 col-3">
						<RadarChart chartData={userData} />
					</div>
					<div className="col-1"></div>
					<div className="col-md-6 col-3">
						<RadarChart chartData={userData} />
					</div>
					<div className="col-1"></div>
					<div className="col-md-6 col-3">
						<RadarChart chartData={userData} />
					</div>
					<div className="col-1"></div>
				</div>
			</Tab>
			<Tab eventKey="JUG" title="JUG">
				<RadarChart chartData={userData} />
			</Tab>
			<Tab eventKey="MID" title="MID">
				<div className="row">
					
					<div className="col-md-3 col-6">
						<RadarChart chartData={userData} />
					</div>
					
					<div className="col-md-3 col-6">
						<RadarChart chartData={userData} />
					</div>
					
					<div className="col-md-3 col-6">
						<RadarChart chartData={userData} />
					</div>
                    <div className="col-md-3 col-6">
						<RadarChart chartData={userData} />
					</div>
					
				</div>
			</Tab>
			<Tab eventKey="ADC" title="ADC">
				<Koala />
			</Tab>
			<Tab eventKey="SUP" title="SUP">
				<Koala />
			</Tab>
		</Tabs>
	);
}

function Koala() {
	return (
		<div>
			<p>我是尾熊我是尾熊我是尾熊我是尾熊我是尾熊我是尾熊我是尾熊</p>
		</div>
	);
}
