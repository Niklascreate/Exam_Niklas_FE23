import Header from "../../components/header/Header"
import ProfileCard from "../../components/krypin/ProfileCard"
import NavBar from "../../components/navbar/NavBar"
import SearchBar from "../../components/searchbar/SearchBar"

function KrypinPage() {
  return (
    <div>
      <Header />
      <SearchBar />
      <ProfileCard />
      <NavBar />
    </div>
  )
}

export default KrypinPage
