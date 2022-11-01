import React from "react";
import {Card} from "react-bootstrap";

export default function QAPage() {
	return (
		<div className="text-center">
			<h1 className="text-center QATitle"> Q&A </h1>
			<QADrawer/>
			
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
QAs.add("數據來源是哪裡呢？可靠嗎？","這裡的數據來源都是Leaguepedia 的API 抓下來的，除非後續計算有寫錯，基本上是很可靠的。")
QAs.add("網站會持續更新嗎？","基本上如果資料來源沒有出意外，都能夠自動更新，但如果有一些功能比較複雜的就得手動更新了")
QAs.add("我有發現網站有問題/有一些建議想提供，該怎麼聯繫呢？","很高興你願意分享使用經驗，歡迎寄信到我的email，email: kaizzstudio@gmail.com")
QAs.add("網站是透過甚麼架設的呢？","前端是React.JS 後端是Golang 前端掛在Github Pages，後端服務與資料庫都是在GCP上運作的，如果哪天免費的額度用完了，可能會面臨關站QQ")
function QADrawer(){
	let res=[]
	for (let i = 0; i < QAs.Questions.length; i++) {
		res.push(<QABlock q={QAs.Questions[i]} a={QAs.Answers[i]} />)
		res.push(<br></br>)
	}
	return(
		<div>
			{res}
		</div>
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