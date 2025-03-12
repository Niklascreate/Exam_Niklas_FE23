import './profilecard.css';
import { useState } from 'react';
import { Interests } from '../../../interface/interface';

const UserProfile = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [interests, setInterests] = useState<Interests>({
    first: 'Vad gillar du?',
    second: 'Vad gillar du?',
    third: 'Vad gillar du?',
  });

  const changeInterest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInterests(prev => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    setEditMode(prev => !prev);
  };

  return (
    <div className="profilecard-container">
      <div className="profile-top">
        <img src="path-till-bild.png" alt="avatar" className="profile-img" />
        <button className="edit-btn" onClick={toggleEdit}>
          <i className={`bi ${editMode ? 'bi-check-square-fill' : 'bi-pencil-fill'}`}></i>
        </button>
      </div>

      <div className="profile-info">
        <h4>BECCIUS</h4>
        <p>Lunis sedan 2001</p>
        <p>Jag gillar:</p>

        {editMode ? (
          <div className="interests-input">
            <input type="text" name="first" value={interests.first} onChange={changeInterest} />
            <input type="text" name="second" value={interests.second} onChange={changeInterest} />
            <input type="text" name="third" value={interests.third} onChange={changeInterest} />
          </div>
        ) : (
          <ul className="interests-list">
            <li><i className="bi bi-check-square-fill"></i> {interests.first}</li>
            <li><i className="bi bi-check-square-fill"></i> {interests.second}</li>
            <li><i className="bi bi-check-square-fill"></i> {interests.third}</li>
          </ul>
        )}
      </div>

      <p className="profile-footer">
        Pie apple pie shortbread liquorice chocolate cake jelly-o cookie shortbread muffin.
      </p>
    </div>
  );
};

export default UserProfile;
