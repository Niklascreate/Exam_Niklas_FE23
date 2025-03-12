import './navbar.css';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();

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
                    <a onClick={() => navigate('/krypin')}>
                        <i className="bi bi-person-fill"></i>
                        <span>Krypin</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}
export default NavBar
