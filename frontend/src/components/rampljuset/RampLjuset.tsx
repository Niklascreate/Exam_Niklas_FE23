import { useState, useEffect } from "react";
import { fetchOnlineUsers } from "../../../api/api";
import { rampljuset } from "../../../interface/interface";
import './rampljuset.css';

const MAX_USERS = 4;

function RampLjuset() {
  const [users, setUsers] = useState<rampljuset[]>([]);

  const getUsers = async () => {
    const data = await fetchOnlineUsers();
    setUsers(data.users.slice(-MAX_USERS));
  };

  useEffect(() => {
    getUsers();
    const interval = setInterval(getUsers, 180000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rampljuset-container">
      <div className="rampljuset-rubrik">EN STUND I RAMPLJUSET</div>
      <div className="user-list">
        {users.map((user, index) => (
          <div key={user.id} className="user" style={{ animationDelay: `${index * 0.2}s` }}>
            <img src={user.imageUrl} alt="User" className="user-img" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RampLjuset;
