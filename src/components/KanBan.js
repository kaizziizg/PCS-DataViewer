import React from "react";
import {
	Navbar,
	Nav,
} from "react-bootstrap"; //導入需要的component
import {
	NavLink 
  } from "react-router-dom";
export default function KanBan() {
	return (
		<header className="header">
			<div className="container position-relative">
				<Navbar expand="lg">
					{/* 左邊Logo+Title */}
					<Navbar.Brand href="/">
						<h1 className="site-logo">
							<NavLink to="/" className="navbar-brand">
								<img
									className="logo-icon"
									// github Page圖片路徑
									src="./img/icon512.png" 
									alt="logo"
								/>
								{/* <span className="pcs-logo-text">PCS</span> */}
								<span className="logo-text">PCS DataViewer</span>
								</NavLink>
						</h1>
					</Navbar.Brand>
					{/* 右邊選項 */}
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-lg-auto HeadbarText">
							
							<NavLink to="/" className="nav-link me-lg-4">未來賽程</NavLink>
							<NavLink to="/Player" className="nav-link me-lg-4">選手數據</NavLink>
							<NavLink to="/FirstTeam" className="nav-link me-lg-4">夏季第一隊</NavLink>
							<NavLink to="/ChampionPick" className="nav-link me-lg-4">英雄選用率</NavLink>
							<NavLink to="/QA" className="nav-link me-lg-4">Q&A</NavLink>
							
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		</header>
	);
}
