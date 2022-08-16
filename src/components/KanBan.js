import React from "react";
import {
	Navbar,
	Nav,
	NavDropdown,
	Form,
	FormControl,
	Button,
} from "react-bootstrap"; //導入需要的component

export default function KanBan() {
	return (
		<header class="header">
			<div class="container position-relative">
				<Navbar expand="lg">
					{/* 左邊Logo+Title */}
					<Navbar.Brand href="/">
						<h1 class="site-logo">
							<a class="navbar-brand" href="/">
								<img
									class="logo-icon"
									src="/img/icon512.png"
									alt="logo"
								/>
								{/* <span class="pcs-logo-text">PCS</span> */}
								<span class="logo-text">PCS DataViewer</span>
							</a>
						</h1>
					</Navbar.Brand>
					{/* 右邊選項 */}
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-lg-auto HeadbarText">
							<Nav.Link href="#Future" class="me-lg-4"><p>未來賽程</p></Nav.Link>
							<Nav.Link href="#Player" class="me-lg-4">選手數據</Nav.Link>
							<Nav.Link href="#FirstTeam" class="me-lg-4">夏季第一隊</Nav.Link>
							<Nav.Link href="#HeroPick" class="me-lg-4">英雄選用率</Nav.Link>
							<Nav.Link href="#QA" class="me-lg-4">Q&A</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		</header>
	);
}
