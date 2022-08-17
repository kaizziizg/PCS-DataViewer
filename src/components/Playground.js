import React from "react";
import { Chart } from "react-chartjs-2";

export default function Playground() {
	const labels = ["January", "February", "March", "April", "May", "June"];

	const data = {
		labels: labels,
		datasets: [
			{
				label: "My First dataset",
				backgroundColor: "rgb(255, 99, 132)",
				borderColor: "rgb(255, 99, 132)",
				data: [0, 10, 5, 2, 20, 30, 45],
			},
		],
	};

	const config = {
		type: "line",
		data: data,
		options: {},
	};
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
      );
	return <canvas id="myChart"></canvas>;
}
