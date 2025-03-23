import './navbar.css'; 
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useUserStore from '../../../store/userStore';
import { getFriendRequests } from '../../../api/api';
import { FriendRequest } from '../../../interface/interface';

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useUserStore((state) => state.user);
    const fetchUserData = useUserStore((state) => state.fetchUserData);

    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
    const [hasNewRequests, setHasNewRequests] = useState(false);
    const [hasViewedRequests, setHasViewedRequests] = useState(false);

    useEffect(() => {
        if (!user?.id) return;

        const fetch = async () => {
            try {
                const data = await getFriendRequests(user.id);
                setFriendRequests(data);
                if (data.length > 0 && !hasViewedRequests) {
                    setHasNewRequests(true);
                }
            } catch (err) {
                console.error('Kunde inte hämta vänförfrågningar:', err);
            }
        };

        fetch();

        const interval = setInterval(() => {
            fetch();
        }, 5000);

        return () => clearInterval(interval);
    }, [user, hasViewedRequests]);

    const GoToKrypin = () => {
        if (user?.id && user?.token) {
            fetchUserData(user.id, user.token);
        }
        navigate('/krypin');
    };

    const goToFriends = () => {
        setHasNewRequests(false);
        setHasViewedRequests(true);
        navigate('/friends');
    };

    return (
        <nav className="navbar-mobile">
            <ul>
                <li>
                    <a onClick={() => navigate('/landingpage')} className={location.pathname === "/landingpage" ? "active" : ""}>
                        <i className="bi bi-house-door-fill"></i>
                        <span className='target-page'>Hem</span>
                    </a>
                </li>
                <li>
                    <a onClick={goToFriends} className={location.pathname === "/friends" ? "active" : ""}>
                        <div className="heart-container">
                            <i className={`bi bi-heart-fill ${hasNewRequests ? 'pump' : ''}`}></i>
                            {friendRequests.length > 0 && (
                                <span className="heart-badge-navbar">{friendRequests.length}</span>
                            )}
                        </div>
                        <span className='target-page'>Vänner</span>
                    </a>
                </li>
                <li>
                    <a onClick={() => navigate('/wall')} className={location.pathname === "/wall" ? "active" : ""}>
                        <i className="bi bi-file-earmark-text-fill"></i>
                        <span className='target-page'>Väggen</span>
                    </a>
                </li>
                <li>
                    <a onClick={() => navigate('/chat')} className={location.pathname === "/chat" ? "active" : ""}>
                        <i className="bi bi-chat-fill"></i>
                        <span className='target-page'>Chat</span>
                    </a>
                </li>
                <li>
                    <a onClick={GoToKrypin} className={location.pathname === "/krypin" ? "active" : ""}>
                        <i className="bi bi-person-fill"></i>
                        <span className='target-page'>Krypin</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
