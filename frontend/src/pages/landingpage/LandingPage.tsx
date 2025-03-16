import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import SearchBar from "../../components/searchbar/SearchBar";
import './landingpage.css';

function LandingPage() {
  return (
    <div>
      <Header />
      <SearchBar />

      <div className="infobox-container">
        <h2 className="welcome-rubrik">Välkommen till LUNARCHAT</h2>
      </div>
      <div className="infobox-information">
        <h2 className="info-rubrik">Gamla vanor, nya funktioner!</h2>
        <p className="info-text">LunarChat tar det bästa från förr och kombinerar det med moderna funktioner. Chatta med vänner, möt nya människor och upplev nostalgisk gemenskap – fast i en ny tappning! </p>
      </div>
      <NavBar />
    </div>
  )
}

export default LandingPage
