import './profilecard.css';
import { useState, useEffect } from 'react';
import { Interests } from '../../../interface/interface';
import { fetchUserInterests, updateUserInterests } from '../../../api/api';
import useUserStore from '../../../store/userStore';

const UserProfile = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [interests, setInterests] = useState<Interests>({
    first: 'Laddar...',
    second: 'Laddar...',
    third: 'Laddar...',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const user = useUserStore((state) => state.user);
  const userId = user?.id;  // 🔥 Byter från email → id
  const token = user?.token;

  useEffect(() => {
    if (!userId) return;  // 🔥 Kontrollera att vi har ett `id`

    const loadInterests = async () => {
      try {
        const userInterests = await fetchUserInterests(userId); // 🔥 Hämta intressen med id
        if (userInterests) {
          setInterests({
            first: userInterests[0] || 'Vad gillar du?',
            second: userInterests[1] || 'Vad gillar du?',
            third: userInterests[2] || 'Vad gillar du?',
          });
        }
      } catch (error) {
        console.error('Misslyckades att hämta intressen:', error);
      }
    };

    loadInterests();
  }, [userId]); // 🔥 Använder `userId` istället för `userEmail`

  const changeInterest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInterests((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!userId || !token) { // 🔥 Kontrollera att vi har `id`
      setError('Du måste vara inloggad för att uppdatera intressen.');
      return;
    }

    // ✅ Kontrollera att intressena inte är tomma
    if (!interests.first.trim() || !interests.second.trim() || !interests.third.trim()) {
      setError('Intressen kan inte vara tomma.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updateUserInterests(token, userId, Object.values(interests)); // 🔥 Skicka `id` istället för email
      setEditMode(false);
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

        {error && <p className="error-message">{error}</p>}
      </div>

      <p className="profile-footer">
        Pie apple pie shortbread liquorice chocolate cake jelly-o cookie shortbread muffin.
      </p>
    </div>
  );
};

export default UserProfile;
