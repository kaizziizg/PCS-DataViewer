import React, { useEffect,useState } from "react";
import RadarChart from "../components/RadarChart2";
import axios from "axios";
import { ServerIP } from "../Environment";

const server = ServerIP;
export default function TeamRadar(props){
    
    return(
        <div className="TeamRadar text-center">
            <RoleRadar t1={props.t1} t2={props.t2} Role={props.Role} />
        </div>
    )
}

function RoleRadar(Props) {
	const [Datas, setData] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const result = await axios.get(
				server + "/TeamScore?Role=" + Props.Role+"&Team1="+ Props.t1 +"&Team2="+Props.t2
			);
			setData(result.data);
		}
		fetchData();
	}, []);
    let Total=[]
    Datas.map((data,index) => (
        Total.push(
            {
				label: data.Team + " " + data.Player,
				data: [data.KDA, data.EGPM,data.DPM,data.FBP,data.KP,data.GD10,data.XPD10,data.CSD],
				fill: true,
				backgroundColor: colora[index % 16],
				borderColor: color[index % 16],
				pointBackgroundColor: color[index % 16],
				pointBorderColor: "#fff",
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: color[index % 16],
			}
        )
    ))
    
	const data = {
		labels: ["KDA", "EGPM", "DPM", "FBP", "KP", "GD10", "XPD10", "CSD10"],
		datasets: Total,
	};
    
	return (
		<div className="row justify-content-around">
            <div className="col-10">
                <RadarChart chartData={data} />
            </div>
			
		</div>
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
