import Header from '../../components/header/Header';
import NavBar from '../../components/navbar/NavBar';
import SearchBar from '../../components/searchbar/SearchBar';
import './userprofilepage.css';

function UserProfilePage() {
  return (
    <>
    <Header />
    <SearchBar />
    <div className="userprofile-container">
      <div className="userprofile-header">
        <img src="assets/maskot4.webp" alt="avatar" className="userprofile-img" />

        <div className="userprofile-info">
          <h4 className='userprofile-name'>Användare</h4>
          <p className="userprofile-since">Lunis sedan 2001</p>
          <p className='userprofile'>Jag gillar:</p>

          <ul className="userprofile-list">
            <li><i className="bi bi-check"></i> Intresse 1</li>
            <li><i className="bi bi-check"></i> Intresse 2</li>
            <li><i className="bi bi-check"></i> Intresse 3</li>
          </ul>
        </div>

        <button className="add-button">
        <i className="bi bi-person-plus-fill"></i>
        </button>
      </div>

      <p className="userprofile-about">Berätta för andra Lunisar vem du är</p>
    </div>
    <NavBar />
    </>
  )
}

export default UserProfilePage
