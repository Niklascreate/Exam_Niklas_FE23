import './header.css';
function Header() {
  return (
    <header className="header-container">
        <div className="rubrik-header">
            <h1>LUNAR<br />CHAT</h1>
        </div>
        <div className="lunisar-online">
            <p className='counter-lunisar'>39924</p> <br /><p className='rubrik-lunisar'>LUNISAR ONLINE</p>
        </div>
    </header>
  )
}

export default Header;
