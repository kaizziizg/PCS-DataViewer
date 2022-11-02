import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TeamRadar from "./TeamRadar";
export default function TeamTab(props) {
	return (
		<Tabs
			defaultActiveKey="MID"
			id="justify-tab-example"
			className="mb-3"
			justify
		>
			<Tab eventKey="TOP" title="TOP">
				<TeamRadar t1={props.t1} t2={props.t2} Role="Top" />
			</Tab>
			<Tab eventKey="JUG" title="JUG">
				<TeamRadar t1={props.t1} t2={props.t2} Role="Jungle" />
			</Tab>
			<Tab eventKey="MID" title="MID">
				<TeamRadar t1={props.t1} t2={props.t2} Role="Mid" />
			</Tab>
			<Tab eventKey="ADC" title="ADC">
				<TeamRadar t1={props.t1} t2={props.t2} Role="Bot" />
			</Tab>
			<Tab eventKey="SUP" title="SUP">
				<TeamRadar t1={props.t1} t2={props.t2} Role="Support" />
			</Tab>
		</Tabs>
	);
}
