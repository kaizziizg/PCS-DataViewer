import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";


function today(){
    var today=new Date();
    var str="";
    // str+=today.getFullYear()+"-";
    // var month=today.getMonth()+1;//返回值是 0（一月） 到 11（十二月） 之间的一个整数。
    // if(month<10){
    //     str+="0";
    // }
    // str+=month+"-";
    // var day=today.getDate();//返回值是 1 ~ 31 之间的一个整数
    // if(day<10){
    //     str+="0";
    // }
    // str+=day;
    str+=today.getTime()
    console.log(str)
    return str;
}


function daysDistance(date1, date2) {     
    //parse() 是 Date 的一个静态方法 , 所以应该使用 Date.parse() 来调用，而不是作为 Date 的实例方法。返回该日期距离 1970/1/1 午夜时间的毫秒数
    date1 = Date.parse(date1);
    date2 = Date.parse(date2);
    //计算两个日期之间相差的毫秒数的绝对值
    var ms= Math.abs(date2 - date1);
    //毫秒数除以一天的毫秒数,就得到了天数
    var days = Math.floor(ms / (24 * 3600 * 1000));
    return days ;
};

function hoursDistance(date1, date2) {     
    //parse() 是 Date 的一个静态方法 , 所以应该使用 Date.parse() 来调用，而不是作为 Date 的实例方法。返回该日期距离 1970/1/1 午夜时间的毫秒数
    // date1 = Date.parse(date1);
    date2 = Date.parse(date2);
    //计算两个日期之间相差的毫秒数的绝对值
    var ms= Math.abs(date2 - date1);
    //毫秒数除以一天的毫秒数,就得到了天数
    var hours = Math.floor(ms / (3600 * 1000));
    return hours ;
};

function TimeDistance(date2) {  
    let date1 = new Date().getTime();   
    date2 = Date.parse(date2);
    var ms= Math.abs(date2 - date1);
    var days = Math.floor(ms / (24 * 3600 * 1000));
    var hours = Math.floor(ms / (3600 * 1000)) - days*24;
    var minutes = Math.floor(ms / (60 * 1000)) - hours*60 - days*24*60;
    console.log(date2)
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
        console.log('execute function in useEffect');
		axiosGetSchedule();
	}, []);

    const axiosGetSchedule = ()=>{
        axios.get("http://127.0.0.1/schedule").then(function (res) {
            setData(res.data);
		})
    }

    for (let i = 0; i < Data.Team1.length; i++) {
        cardList.push(<li><Tournament date={Data.DateTime[i]} weekend={Data.Weekend[i]} t1={Data.Team1[i]} t2={Data.Team2[i]}/></li>);
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
		<div class="container py-lg-5 position-relative">
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

