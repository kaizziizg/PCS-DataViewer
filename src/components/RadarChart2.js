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
		},
		
	},
	plugins: {
		legend: {
			position: "right",
			fullSize: false,
		},
	},
};

const options2= {
    legend: {
      position: 'top',
      labels: {
        fontColor: 'white'
      }
    },
    title: {
      display: true,
      text: 'Chart.js Radar Chart',
      fontColor: 'white'
    },
    scale: {
      ticks: {
        beginAtZero: true,
        fontColor: 'white', // labels such as 10, 20, etc
        showLabelBackdrop: false // hide square behind text
      },
      pointLabels: {
        fontColor: 'white' // labels around the edge like 'Running'
      },
      gridLines: {
        color: 'rgb(243,202,99)'
      },
      angleLines: {
        color: 'white' // lines radiating from the center
      }
    }
  }

function RadarChart({ chartData }) {
	return <Radar data={chartData} options={options} />;
}

export default RadarChart;
