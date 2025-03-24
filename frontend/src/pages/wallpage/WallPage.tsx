import './wallpage.css';
import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import SearchBar from "../../components/searchbar/SearchBar";
import WallButton from "../../components/wallbutton/WallButton";
import WallMessage from "../../components/wallmessage/WallMessage";
import WallMessageBox from "../../components/wallmessagebox/WallMessageBox";
import { getWallMessages } from "../../../api/api";
import { WallMessageType } from "../../../interface/interface";

function WallPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<WallMessageType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      setTimeout(async () => {
        const data = await getWallMessages();
        if (data) {
          setMessages(data);
        }
        setLoading(false);
      }, 1500);
    };
    loadMessages();
  }, []);

  const handleNewMessage = (newMessage: WallMessageType) => {
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  return (
    <div className="wallpage-container">
      <Header />
      <SearchBar />
      <WallButton onClick={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <WallMessage onClose={() => setIsModalOpen(false)} onNewMessage={handleNewMessage} />
      )}

      <div className="wall-messages">
        {loading ? (
          <p className="loading-lunisavtryck">
            {"Lunisavtrycken är på väg...".split("").map((char, index) => (
              <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>{char}</span>
            ))}
          </p>
        ) : (
          messages.length > 0 ? (
            messages.map((msg, index) => (
              <WallMessageBox
                key={index}
                userId={msg.userId}
                profileImage={msg.profileImage}
                nickname={msg.nickname}
                message={msg.message}
                createdAt={msg.createdAt}
              />

            ))
          ) : (
            <p className="no-messages">Inga inlägg ännu...</p>
          )
        )}
      </div>

      <NavBar />
    </div>
  );
}

export default WallPage;
