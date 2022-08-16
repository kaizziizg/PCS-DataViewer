import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";

function TimeDistance(date2) {  
    let date1 = new Date().getTime();   
    date2 = Date.parse(date2);
    var ms= Math.abs(date2 - date1);
    var days = Math.floor(ms / (24 * 3600 * 1000));
    var hours = Math.floor(ms / (3600 * 1000)) - days*24;
    var minutes = Math.floor(ms / (60 * 1000)) - hours*60 - days*24*60;

    return [days,hours,minutes];
};


export default function TotalTournament() {
    const [Data, setData] = useState({
        DateTime: ["2022/8/18 17:00",],
        Team1: ["BYG",],
        Team2: ["JT",],
        Weekend: [5,],
      });
      let cardList = [];
	
	useEffect(() => {
        
		axiosGetSchedule();
	}, []);

    const axiosGetSchedule = ()=>{
        axios.get("http://127.0.0.1/schedule").then(function (res) {
            setData(res.data);
		})
    }

    for (let i = 0; i < Data.Team1.length; i++) {
        cardList.push(<li key={i}><Tournament date={Data.DateTime[i]} weekend={Data.Weekend[i]} t1={Data.Team1[i]} t2={Data.Team2[i]}/></li>);
    }
    
    
    return (
        <ul>
            {cardList}
        </ul>
    )
}

function Tournament(props) {
    let date = new Date();
    // let leftDay,leftHour,leftMinutes = TimeDistance(today(),props.date)
    let leftHour,leftMinutes = 0
    let leftTime = TimeDistance(props.date)
	return (
		<div className="container py-lg-5 position-relative">
			<Card className="text-center">
				<Card.Header>{props.date} 星期{props.weekend} </Card.Header>
				<Card.Body>
					<Card.Title>{props.t1} VS {props.t2}</Card.Title>
					{/* <Card.Text>
                    {props.t1}vs{props.t2}
					</Card.Text> */}
					<Button variant="primary">雙方選手數據比較</Button>
				</Card.Body>
				<Card.Footer className="text-muted">距離開始尚有 : {leftTime[0]} 日 {leftTime[1]} 小時 {leftTime[2]} 分 </Card.Footer>
			</Card>
		</div>
	);
}

