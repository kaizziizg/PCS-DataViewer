import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import TeamTab from "./TeamTab";
import { ServerIP } from "../Environment";
let showpast = true;
const pass = () => {}

const server = ServerIP;
function TimeDistance(date2) {
	let date1 = new Date().getTime();
	date2 = Date.parse(date2);
	let ms = 0;
	let days = 0;
	let hours = 0;
	let minutes = 0;

	if (date2 > date1) {
		ms = date2 - date1;
		days = Math.floor(ms / (24 * 3600 * 1000));
		hours = Math.floor(ms / (3600 * 1000)) - days * 24;
		minutes = Math.floor(ms / (60 * 1000)) - hours * 60 - days * 24 * 60;
		return [days, hours, minutes];
	} else {
		ms = date1 - date2;
		days = Math.floor(ms / (24 * 3600 * 1000));
		hours = Math.floor(ms / (3600 * 1000)) - days * 24;
		minutes = Math.floor(ms / (60 * 1000)) - hours * 60 - days * 24 * 60;
		return [days, hours, minutes];
	}
}

export default function TotalTournament() {
	const [Data, setData] = useState({
		DateTime: ["2022/8/18 17:00"],
		Team1: ["BYG"],
		Team2: ["JT"],
		Weekend: [5],
		T1Win: [1],
		T2Win: [1],
	});
    const [swt,setSwt] = useState(true);
	let cardList = [];

	useEffect(() => {
		axiosGetSchedule();
	}, []);


	const axiosGetSchedule = () => {
		axios.get(server + "/schedule").then(function (res) {
			setData(res.data);
		});
	};

	for (let i = 0; i < Data.Team1.length; i++) {
		cardList.push(
			<Tournament
				date={Data.DateTime[i]}
				weekend={Data.Weekend[i]}
				t1={Data.Team1[i]}
				t2={Data.Team2[i]}
				t1w={Data.T1Win[i]}
				t2w={Data.T2Win[i]}
			/>
		);
	}

	return (
		<div>
            <div style={{display:'flex',justifyContent: "flex-end"}}>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="顯示過往賽程"
                    feedbackTooltip="true"
                    checked={swt}
                    onChange={(e)=>{
                        setSwt(!swt)
                        console.log(!swt)
                        showpast=!swt
                    }
                }
                />
            </div>
			
			{cardList}
		</div>
	);
}

function Tournament(props) {
	let leftTime = TimeDistance(props.date);
	let date1 = new Date().getTime();
	let time = "";
	if (date1 < Date.parse(props.date)) {
		time =
			"距離開始尚有 : " +
			leftTime[0] +
			" 日 " +
			leftTime[1] +
			"小時 " +
			leftTime[2] +
			"分";
	} else {
		time =
			"比賽已經過了 : " +
			leftTime[0] +
			" 日 " +
			leftTime[1] +
			"小時 " +
			leftTime[2] +
			"分";
		// 過五小時就不渲染
		if ((date1 - Date.parse(props.date) > 1000 * 60 * 60 * 5) & !showpast) {
			return;
		}
	}
	return (
		<div className="container py-lg-5 position-relative">
			<Card className="text-center">
				<Card.Header>
					{props.date} 星期 {props.weekend}{" "}
				</Card.Header>
				<Card.Body>
					<Card.Title>
						{props.t1} VS {props.t2}
					</Card.Title>
					<Card.Text>
						夏季賽戰績
						<br />
						{props.t1w} : {props.t2w}
					</Card.Text>
					{/* <Button variant="primary">雙方選手數據比較</Button> */}

					<TeamTab t1={props.t1} t2={props.t2} />
				</Card.Body>
				<Card.Footer className="text-muted">{time} </Card.Footer>
			</Card>
		</div>
	);
}
