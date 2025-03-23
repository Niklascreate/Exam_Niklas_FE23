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

                const preparedUsers = users.users
                    .map(user => ({
                        ...user,
                        profileImage: user.profileImage || "https://lunarchat-profile-images.s3.eu-north-1.amazonaws.com/profile-pictures/maskot2+(2).webp"
                    }))
                    .reverse();

                setOnlineUsers(preparedUsers);
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
                <p className="vakna-lunisar">Vakna Lunisar är på väg...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="users">
                    {onlineUsers.length > 0 ? (
                        onlineUsers.slice(0, 6).map((user) => (
                            <div className="user" key={user.id}>
                                <img src={user.profileImage} alt={user.nickname} className="onlineuser-img" />
                                <p>{user.nickname}</p>
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