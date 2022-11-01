import React from "react";
import Alert from 'react-bootstrap/Alert';
import {Card} from "react-bootstrap";

export default function FirstTeamPage() {
	return (
		<div className="text-center">
			<h1 className="text-center QATitle"> 數據解釋 </h1>
			<Warning/>
			<QADrawer/>
			{/* <ExplainData/> */}
		</div>
	);
}



function Warning() {
  return (
    <div>
        <Alert key="warning" variant="warning">
          數據並不能代表選手能力，會依照戰隊決策、版本因素等等原因浮動
        </Alert>

    </div>
  );
}


function QA(){
	this.Questions = []
	this.Answers = []
	this.add = function(Q,A){
		this.Questions.push(Q)
		this.Answers.push(A)
	}
}

let QAs = new QA()
QAs.add("數據是如何是如何評分的呢？","透過各線路的選手數據最大最小值把分數對應到 0~10 分，也就是說每個數據至少都有一個10分的選手")
QAs.add("選手分數是怎麼計算的呢？","透過上個問題我們取得了各數據分數後，再將其總和平均")


function QADrawer(){
	let res=[]
	for (let i = 0; i < QAs.Questions.length; i++) {
		res.push(<QABlock q={QAs.Questions[i]} a={QAs.Answers[i]} />)
		res.push(<br></br>)
	}
	return(
		<ul>
			{res}
		</ul>
	)
}


function QABlock(props) {
	return (
		<Card>
		  <Card.Header as="h5">{props.q}</Card.Header>
		  <Card.Body>
			<Card.Text >
				{props.a}
			</Card.Text>
			
		  </Card.Body>
		</Card>
	  );
  }