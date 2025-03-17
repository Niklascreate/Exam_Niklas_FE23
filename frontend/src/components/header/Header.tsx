import { useState, useEffect } from "react";
import { fetchOnlineUsers } from '../../../api/api';
import LogoutButton from "../logoutbutton/LogoutButton";
import "./header.css";

function Header() {
  const [onlineCount, setOnlineCount] = useState(0);

  const updateOnlineCount = async () => {
    try {
      const data = await fetchOnlineUsers();
      console.log("API-svar för online users:", data);

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
          <p>LAJV</p>
        </section>
        <section className="lajv-message">
          <p>Nickeboi69: Lunarstorm cancelad</p>
        </section>
      </div>
    </>
  );
}

export default Header;
