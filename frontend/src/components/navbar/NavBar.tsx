import './navbar.css';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/userStore';

function NavBar() {
    const navigate = useNavigate();
    const user = useUserStore((state) => state.user);
    const fetchUserData = useUserStore((state) => state.fetchUserData);

    const GoToKrypin = () => {
        if (user?.id && user?.token) {
            console.log("🔄 Hämtar användardata för Krypin...");
            fetchUserData(user.id, user.token);
        }
        navigate('/krypin');
    };

    return (
        <nav className="nav-bar-mobile">
            <ul>
                <li>
                    <a href="/landingpage">
                        <i className="bi bi-house-door-fill"></i>
                        <span>Hem</span>
                    </a>
                </li>
                <li>
                    <a onClick={() => navigate('/friends')}>
                        <i className="bi bi-heart-fill"></i>
                        <span>Vänner</span>
                    </a>
                </li>
                <li>
                    <a onClick={() => navigate('/chat')}>
                        <i className="bi bi-chat-fill"></i>
                        <span>Chat</span>
                    </a>
                </li>
                <li>
                    <a onClick={() => navigate('/wall')}>
                        <i className="bi bi-file-earmark-text-fill"></i>
                        <span>Väggen</span>
                    </a>
                </li>
                <li>
                    <a onClick={GoToKrypin}>
                        <i className="bi bi-person-fill"></i>
                        <span>Krypin</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}
export default NavBar;
