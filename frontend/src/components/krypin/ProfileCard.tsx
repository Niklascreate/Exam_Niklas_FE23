import './profilecard.css';
import { useState, useEffect } from 'react';
import { updateUserProfile } from '../../../api/api';
import useUserStore from '../../../store/userStore';
import { uploadProfileImage } from '../../../api/api';

const UserProfile = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const user = useUserStore((state) => state.user);
  const fetchUserData = useUserStore((state) => state.fetchUserData);
  const setUser = useUserStore((state) => state.setUser);
  const userId = user?.id;
  const token = user?.token;
  const setProfileImage = useUserStore((state) => state.setProfileImage);

  useEffect(() => {
    if (user?.id && user?.token && !user.interests?.length) {
      fetchUserData(user.id, user.token);
    }
  }, [user?.id, user?.token, user?.interests?.length, fetchUserData]);

  const [interests, setInterests] = useState<string[]>(user?.interests?.length ? user.interests : ["", "", ""]);
  const [bio, setBio] = useState<string>(user?.bio || "");

  useEffect(() => {
    if (user?.interests) {
      setInterests(user.interests.length >= 3 ? user.interests : [...user.interests, "", "", ""]);
    } else {
      setInterests(["", "", ""]);
    }
    if (user?.bio !== undefined) {
      setBio(user.bio);
    }
  }, [user?.interests, user?.bio]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];

    setPreview(URL.createObjectURL(file));

    try {
      if (!userId) {
        throw new Error("User ID saknas.");
      }
      const imageUrl = await uploadProfileImage(userId, file);
      if (!token) {
        throw new Error("Token saknas.");
      }
      await setProfileImage(userId, imageUrl, token);
      setUser({ ...user, profileImage: imageUrl });
    } catch (error) {
      console.error("Fel vid uppladdning av bild:", error);
      setError("Misslyckades att ladda upp profilbilden.");
    }
  };

  const changeInterest = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newInterests = [...interests];
    newInterests[index] = e.target.value;
    setInterests(newInterests);
  };

  const handleSave = async () => {
    if (!userId || !token) {
      setError("Du måste vara inloggad för att uppdatera din profil.");
      return;
    }

    if (interests.some((interest) => !interest.trim())) {
      setError("Intressen kan inte vara tomma.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updateUserProfile(token, userId, interests, bio, user?.profileImage);

      setUser({ ...user, interests, bio });
      setEditMode(false);
    } catch (error) {
      console.error("Misslyckades att uppdatera profil:", error);
      setError("Misslyckades att uppdatera profil. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  const memberSince = (createdAt: string | undefined) => {
    if (!createdAt) return "Okänt antal dagar";

    const createdDate = new Date(createdAt);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays} dagar`;
  };

  return (
    <div className="profilecard-container">
      <div className="profile-header">
        <div className="profile-image-container">
          <img
            src={preview || user?.profileImage || "https://lunarchat-profile-images.s3.eu-north-1.amazonaws.com/profile-pictures/maskot2+(2).webp"}
            alt="Profilbild"
            className="profile-img"
            onClick={() => document.getElementById("profile-image-upload")?.click()}
          />
          {editMode && (
            <>
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              <p className="edit-picture">
                Ladda upp profilbild <i className="bi bi-arrow-up-short"></i>
              </p>
            </>
          )}
        </div>

        <div className="profile-info">
          <h4 className='user-nickname'>{user?.nickname || 'Användare'}</h4>
          <p className="lunis-since">Lunis i {memberSince(user?.createdAt)}</p>

          <p className='gillar'>Jag gillar:</p>

          {editMode ? (
            <div className="interests-input">
              {interests.map((interest, index) => (
                <input
                  key={index}
                  type="text"
                  value={interest}
                  onChange={(e) => changeInterest(e, index)}
                  placeholder={`Intresse ${index + 1}`}
                />
              ))}
            </div>
          ) : (
            <ul className="interests-list">
              {interests.map((interest, index) => (
                <li className='list-li' key={index}><i className="bi bi-check"></i> {interest || `Intresse ${index + 1}`}</li>
              ))}
            </ul>
          )}
        </div>

        <button className="edit-btn" onClick={editMode ? handleSave : () => setEditMode(true)} disabled={loading}>
          <i className={`bi ${editMode ? 'bi bi-check2-square' : 'bi-pencil-fill'}`}></i>
        </button>
      </div>

      {editMode ? (
        <textarea
          className="bio-input"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Berätta för andra Lunisar vem du är..."
        />
      ) : (
        <p className="about-text">{bio || "Berätta för andra Lunisar vem du är"}</p>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default UserProfile;
