import './navbar.css';

function NavBar() {
  return (
    <nav className="nav-bar-mobile">
    <ul>
        <li>
            <a href="#home">
                <i className="bi bi-house-door-fill"></i>
                <span>Hem</span>
            </a>
        </li>
        <li>
            <a href="#friends">
                <i className="bi bi-heart-fill"></i>
                <span>Vänner</span>
            </a>
        </li>
        <li>
            <a href="#chat">
                <i className="bi bi-chat-fill"></i>
                <span>Chat</span>
            </a>
        </li>
        <li>
            <a href="#wall">
                <i className="bi bi-file-earmark-text-fill"></i>
                <span>Väggen</span>
            </a>
        </li>
        <li>
            <a href="#profile">
                <i className="bi bi-person-fill"></i>
                <span>Krypin</span>
            </a>
        </li>
    </ul>
</nav>

  )
}

export default NavBar
