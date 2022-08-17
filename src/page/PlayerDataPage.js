import React, { useEffect, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import axios from "axios";


export default function PlayerDataPage() {
	return (
		<div className="text-center">
			<h1 className="text-center QATitle"> 選手數據 </h1>
			<FillExample/>
		</div>
	);
}

function FillExample() {
	return (
	  <Tabs
		defaultActiveKey="profile"
		id="fill-tab-example"
		className="mb-3"
		fill
	  >
		<Tab eventKey="TOP" title="TOP">
		  <Koala/>
		</Tab>
		<Tab eventKey="JUG" title="JUG">
		  <Koala/>
		</Tab>
		<Tab eventKey="MID" title="MID">
		  <Koala/>
		</Tab>
		<Tab eventKey="ADC" title="ADC">
		  <Koala/>
		</Tab>
		<Tab eventKey="SUP" title="SUP">
		  <Koala/>
		</Tab>
		
	  </Tabs>
	);
  }
  
function Koala(){
	return(
		<div>
			<p>
			我是尾熊我是尾熊我是尾熊我是尾熊我是尾熊我是尾熊我是尾熊
			</p>
			
		</div>
	)
}