import { useState } from "react";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import SearchBar from "../../components/searchbar/SearchBar";
import WallButton from "../../components/wallbutton/WallButton";
import WallMessage from "../../components/wallmessage/WallMessage";

function WallPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="wallpage-container">
      <Header />
      <SearchBar />
      <WallButton onClick={() => setIsModalOpen(true)} />
      {isModalOpen && <WallMessage onClose={() => setIsModalOpen(false)} />}
      <NavBar />
    </div>
  );
}

export default WallPage;
