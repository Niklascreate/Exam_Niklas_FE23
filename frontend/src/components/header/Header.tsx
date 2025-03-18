import { useState, useEffect } from "react";
import { fetchOnlineUsers } from "../../../api/api";
import LogoutButton from "../logoutbutton/LogoutButton";
import LajvModal from "../lajvmodal/LajvModal";
import useLajvStore from "../../../store/lajvStore";
import "./header.css";

function Header() {
  const [onlineCount, setOnlineCount] = useState(0);
  const [isLajvOpen, setIsLajvOpen] = useState(false);
  const messages = useLajvStore((state) => state.messages);
  const latestMessage = messages.length > 0 ? messages[messages.length - 1] : null;

  const updateOnlineCount = async () => {
    try {
      const data = await fetchOnlineUsers();

      if (data && Array.isArray(data.users)) {
        setOnlineCount(data.users.length);
      } else {
        setOnlineCount(0);
      }
    } catch (error) {
      console.error("Fel vid hämtning av online lunisar:", error);
      setOnlineCount(0);
    }
  };

  useEffect(() => {
    updateOnlineCount();
    const interval = setInterval(updateOnlineCount, 180000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="header-container">
        <div className="rubrik-header">
          <h1>
            LUNAR<br />CHAT
          </h1>
        </div>
        <div className="lunisar-online">
          <p className="counter-lunisar">{onlineCount}</p><br />
          <p className="rubrik-lunisar">LUNISAR ONLINE</p>
        </div>
      </header>
      <LogoutButton />

      <div className="lajv-container">
        <section className="lajv-box">
          <button className="lajv-btn" onClick={() => setIsLajvOpen(true)}>LAJV</button>
        </section>
        <section className="lajv-message">
          <p className="lajv">
            {latestMessage ? `${latestMessage.nickname}: ${latestMessage.text}` : "Inga LAJV ännu..."}
          </p>
        </section>
      </div>
      <LajvModal isOpen={isLajvOpen} onClose={() => setIsLajvOpen(false)} />
    </>
  );
}

export default Header;
