import Header from "../../components/header/Header"
import NavBar from "../../components/navbar/NavBar"
import SearchBar from "../../components/searchbar/SearchBar"
import WallButton from "../../components/wallbutton/WallButton"

function WallPage() {
  return (
    <div>
      <Header />
      <SearchBar />
      <WallButton />
      <NavBar />
    </div>
  )
}

export default WallPage
