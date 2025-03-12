import './header.css';

function Header() {
  return (
    <>
      <header className="header-container">
        <div className="rubrik-header">
          <h1>LUNAR<br />CHAT</h1>
        </div>
        <div className="lunisar-online">
          <p className='counter-lunisar'>12</p><br />
          <p className='rubrik-lunisar'>LUNISAR ONLINE</p>
        </div>
      </header>
      <div className='lajv-container'>
        <section className='lajv-box'>
          <p>LAJV</p>
        </section>
        <section className='lajv-message'>
          <p>Nickeboi69: Lunarstorm cancelad</p>
        </section>
      </div>
    </>
  );
}

export default Header;
