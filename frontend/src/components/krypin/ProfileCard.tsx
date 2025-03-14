import './profilecard.css';
import { useState, useEffect } from 'react';
import { updateUserInterests } from '../../../api/api';
import useUserStore from '../../../store/userStore';

const UserProfile = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const user = useUserStore((state) => state.user);
  const fetchUserData = useUserStore((state) => state.fetchUserData);
  const setUser = useUserStore((state) => state.setUser);
  const userId = user?.id;
  const token = user?.token;

  // ✅ Hämta användardata om intressen saknas
  useEffect(() => {
    if (user?.id && user?.token && !user.interests?.length) {
      fetchUserData(user.id, user.token);
    }
  }, [user?.id, user?.token, user?.interests?.length, fetchUserData]);

  // ✅ Initiera tomma fält om inga intressen finns
  const [interests, setInterests] = useState<string[]>(
    user?.interests?.length ? user.interests : ["", "", ""]
  );

  useEffect(() => {
    if (user?.interests) {
      setInterests(user.interests);
    }
  }, [user?.interests]);

  const changeInterest = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newInterests = [...interests];
    newInterests[index] = e.target.value;
    setInterests(newInterests);
  };

  const handleSave = async () => {
    console.log("User ID:", userId);
    console.log("Token:", token);
  
    if (!userId || !token) {
      setError('Du måste vara inloggad för att uppdatera intressen.');
      return;
    }

    if (interests.some((interest) => !interest.trim())) {
      setError('Intressen kan inte vara tomma.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 🔥 Uppdatera intressen i API
      await updateUserInterests(token, userId, interests);

      // ✅ Uppdatera användaren i Zustand
      setUser({ ...user, interests });

      setEditMode(false);
      console.log("Intressen uppdaterade i API och Zustand:", interests);

    } catch (error) {
      console.error('Misslyckades att uppdatera intressen:', error);
      setError('Misslyckades att uppdatera intressen. Försök igen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profilecard-container">
      <div className="profile-top">
        <img src="assets/maskot4.webp" alt="avatar" className="profile-img" />
        <button className="edit-btn" onClick={editMode ? handleSave : () => setEditMode(true)} disabled={loading}>
          <i className={`bi ${editMode ? 'bi-check-square-fill' : 'bi-pencil-fill'}`}></i>
        </button>
      </div>

      <div className="profile-info">
        <h4>{user?.nickname || 'Användare'}</h4>
        <p>Lunis sedan 2001</p>
        <p>Jag gillar:</p>

        {editMode ? (
          <div className="interests-input">
            {interests.map((interest, index) => (
              <input 
                key={index} 
                type="text" 
                value={interest} 
                onChange={(e) => changeInterest(e, index)} 
                placeholder={`Intresse ${index + 1}`} // 🔥 Placeholder för nya användare
              />
            ))}
          </div>
        ) : (
          <ul className="interests-list">
            {interests.map((interest, index) => (
              <li key={index}><i className="bi bi-check-square-fill"></i> {interest || `Intresse ${index + 1}`}</li>
            ))}
          </ul>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>

      <p className="profile-footer">
        Pie apple pie shortbread liquorice chocolate cake jelly-o cookie shortbread muffin.
      </p>
    </div>
  );
};

export default UserProfile;
