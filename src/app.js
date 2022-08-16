import 'bootstrap/dist/css/bootstrap.css';
import "@fontsource/maven-pro";
import KanBan from './components/KanBan';
import TotalTournament from './components/FutureTournament';
function App() {
	return(
    <div class="App container py-lg-5 position-relative">
      <KanBan/>

      <TotalTournament/>
    </div>
  )
}



export default App;
