import React from "react";
import ReactDOM from "react-dom/client";
// Pages
import ScheudlePage from "./page/SchedulePage";
import PlayerDataPage from "./page/PlayerDataPage";
import FirstTeamPage from "./page/FirstTeamPage";
import ChampionPickPage from "./page/ChampionPickPage";
import QAPage from "./page/QAPage";
import DataExplainPage from "./page/DataExplainPage";
// HeaderBar
import KanBan from "./components/KanBan";
// Route
import { HashRouter, Route, Routes, Link } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
// import App from './app'
import "./css/theme.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fontsource/maven-pro";

function Not404() {
	return (
		<div className="text-center errorText">
			<img src="/img/iconf512.png" className="errorImg rotate"/>
			<br />
			你似乎跑到一個錯誤路徑
			<br />
			可以點選上面的選單來重新開始
			
		</div>
		
	);
}
// import "./css/theme.css";

// reportWebVitals();
const App = () => {
	return (
		<HashRouter>
			<div className="App container py-lg-5 position-relative">
				<KanBan />
				<Routes>
					<Route path="/QA" element={<QAPage />} />
					<Route path="/Player" element={<PlayerDataPage />} />
					<Route path="/FirstTeam" element={<FirstTeamPage />} />
					<Route path="/ChampionPick" element={<ChampionPickPage />} />
					<Route path="/DataExplain" element={<DataExplainPage />} />
					<Route path="/" element={<ScheudlePage />} />
					<Route path="*" element={<Not404 />} />
				</Routes>
			</div>
		</HashRouter>
	);
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
