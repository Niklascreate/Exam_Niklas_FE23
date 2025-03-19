import { useEffect, useState } from "react";
import { fetchOnlineUsers } from "../../../api/api";
import { OnlineUser } from '../../../interface/interface';
import './onlinelunisar.css';


function OnlineLunisar() {
    const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getOnlineUsers = async () => {
            try {
                setLoading(true);
                const users = await fetchOnlineUsers();
    
                setOnlineUsers(users.users);
            } catch (err) {
                console.error("Fel vid hämtning av online-användare:", err);
                setError("Kunde inte hämta online-användare.");
            } finally {
                setLoading(false);
            }
        };
    
        getOnlineUsers();
    }, []);

    return (
        <div className="useronline-container">
            <h2 className='usersonline-rubrik'>VAKNA LUNISAR</h2>
            {loading ? (
                <p>Laddar...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="users">
                    {onlineUsers.length > 0 ? (
                        onlineUsers.map((user) => (
                            <div className="user" key={user.id}>
                                <img src={user.avatar} alt="Användarbild" className="user-img" />
                                <span className={`status ${user.status}`}></span>
                            </div>
                        ))
                    ) : (
                        <p>Inga användare online.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default OnlineLunisar;
