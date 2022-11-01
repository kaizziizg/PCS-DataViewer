import React from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const options = {
	elements: {
		line: {
			borderWidth: 3,
		},
	},
	scale: {
		min: -10,
		max: 10,
		ticks: {
			beginAtZero: false,
			max: 10,
			min: -10,
			
		}
	},
};

function RadarChart({ chartData }) {
	return <Radar data={chartData} options={options} />;
}

export default RadarChart;
