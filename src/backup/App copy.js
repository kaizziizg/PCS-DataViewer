import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import KanBan from "./components/KanBan";
import 'bootstrap/dist/css/bootstrap.css';
import "@fontsource/maven-pro";
function App() {
	return(
    <div class="App">
      <KanBan/>
    </div>
  )
}

export default App;
