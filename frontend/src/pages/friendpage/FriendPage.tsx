import Header from "../../components/header/Header"
import NavBar from "../../components/navbar/NavBar"
import OnlineLunisar from "../../components/onlineLunisar/OnlineLunisar"
import SearchBar from "../../components/searchbar/SearchBar"
import Friends from '../../components/friends/friends';

function FriendPage() {
  return (
    <div>
      <Header />
      <SearchBar />
      <OnlineLunisar />
      <Friends />
      <NavBar />
    </div>
  )
}

export default FriendPage
