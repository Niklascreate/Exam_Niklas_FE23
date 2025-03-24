import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import RampLjuset from "../../components/rampljuset/RampLjuset";
import SearchBar from "../../components/searchbar/SearchBar";
import './landingpage.css';

function LandingPage() {
  return (
      <div className="landingpage-container">
        <Header />
        <SearchBar />

        <div className="infobox-container">
          <h2 className="welcome-rubrik">Välkommen till LUNARCHAT</h2>
        </div>
        <div className="infobox-information">
          <h2 className="info-rubrik">Gamla vanor, nya funktioner!</h2>
          <p className="info-text">
            LunarChat tar det bästa från förr och kombinerar det med moderna funktioner. Chatta med vänner, möt nya människor och upplev nostalgisk gemenskap – fast i en ny tappning!
          </p>
        </div>

        <RampLjuset />

        <div className="infobox-container">
          <h2 className="welcome-rubrik">WZUP??</h2>
        </div>
        <div className="infobox-information">
          <h2 className="info-rubrik">Söker Lunisar för nattligt månsnack! Skriv 123</h2>
          <p className="info-text">Någon som är vaken och sugen på att nattchatta?? Skriv 123 isåfall!</p>
          <h2 className="info-rubrik">Beam me up, Lunisar!</h2>
          <p className="info-text">Har tråk så beam me up... eller i alla fall skicka en rolig meme! Du gör ju rymden roligare ;)</p>
          <h2 className="info-rubrik">Du är en riktig bejb</h2>
          <p className="info-text">Måste bara säga det...............Du är en riktig bejb, om ingen har sagt det till dig idag! ;D</p>
        </div>

        <div className="infobox-container">
          <h2 className="welcome-rubrik">Utforska Hur det är att vara en lunis</h2>
        </div>
        <div className="infobox-information">
          <h2 className="info-rubrik">Vad är Väggen?</h2>
          <p className="info-text">Ge dig in i Väggen och släpp lös klottrandet, skrattet och låt snacket flöda fritt med andra Lunisar! Skriv vad du vill - alla Lunisar kan se och svara. Kom igång och sprid lite rymdglädje!</p>
          <h2 className="info-rubrik">Huttra inte, kryp in!</h2>
          <p className="info-text">Kryp in och stajla din alldeles egna LunarChat-profil! Visa upp dina mest gillade intressen, någon annan kanske gillar samma. Vi Lunisarna håller ihop!</p>
          <h2 className="info-rubrik">Chatta med vänner och andra</h2>
          <p className="info-text">Känner du dig ensam i rymden? Nejdå, inte här! Här är det öppet för allt från djupa samtal till ren och skär flams, oavsett om du chattar med vänner eller precis har börjat chatta med en främling.</p>
        </div>
        <NavBar />
      </div>
  );
}

export default LandingPage;
