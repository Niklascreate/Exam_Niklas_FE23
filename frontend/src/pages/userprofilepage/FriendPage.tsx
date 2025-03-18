import './userprofilepage.css';

function UserProfilePage() {
  return (
    <div className="friendpage-container">
      <div className="profile-header">
        <img src="assets/maskot4.webp" alt="avatar" className="profile-img" />

        <div className="profile-info">
          <h4 className='user-name'>Användare</h4>
          <p className="lunis-since">Lunis sedan 2001</p>
          <p className='gillar'>Jag gillar:</p>

          <ul className="interests-list">
            <li><i className="bi bi-check"></i> Intresse 1</li>
            <li><i className="bi bi-check"></i> Intresse 2</li>
            <li><i className="bi bi-check"></i> Intresse 3</li>
          </ul>
        </div>

        <button className="edit-btn">
          <i className="bi bi-pencil-fill"></i>
        </button>
      </div>

      <p className="about-text">Berätta för andra Lunisar vem du är</p>
    </div>
  )
}

export default UserProfilePage
