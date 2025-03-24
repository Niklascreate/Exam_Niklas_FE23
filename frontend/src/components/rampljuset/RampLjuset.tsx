import { useState, useEffect } from "react";
import { fetchOnlineUsers } from "../../../api/api";
import { UserDataResponse } from "../../../interface/interface";
import './rampljuset.css';

const MAX_USERS = 4;

function RampLjuset() {
  const [users, setUsers] = useState<Pick<UserDataResponse, "id" | "profileImage" | "nickname">[]>([]);

  const getUsers = async () => {
    try {
      const data = await fetchOnlineUsers();
      setUsers(data.users.slice(-MAX_USERS));
    } catch (error) {
      console.error("Fel vid hämtning av online-användare:", error);
    }
  };

  useEffect(() => {
    getUsers();
    const interval = setInterval(getUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rampljuset-container">
      <div className="rampljuset-rubrik">EN STUND I RAMPLJUSET</div>
      <div className="rampljuset-list">
        {users.map((user, index) => (
          <div key={user.id} className="rampljuset-user" style={{ animationDelay: `${index * 0.2}s` }}>
            <img src={user.profileImage} alt="Profilbild" className="rampljuset-img" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RampLjuset;
