import './navbar.css'; 
import { useNavigate, useLocation } from 'react-router-dom';
import useUserStore from '../../../store/userStore';

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useUserStore((state) => state.user);
    const fetchUserData = useUserStore((state) => state.fetchUserData);

    const GoToKrypin = () => {
        if (user?.id && user?.token) {
            fetchUserData(user.id, user.token);
        }
        navigate('/krypin');
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
                    <a onClick={() => navigate('/friends')} className={location.pathname === "/friends" ? "active" : ""}>
                        <i className="bi bi-heart-fill"></i>
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
