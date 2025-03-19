import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import SearchBar from "../../components/searchbar/SearchBar";
import { fetchUserPage, addFriend } from '../../../api/api';
import { User } from "../../../interface/interface";
import "./userprofilepage.css";
import useUserStore from "../../../store/userStore";

function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [friendAdded, setFriendAdded] = useState<boolean>(false);

  const loggedInUser = useUserStore((state) => state.user);


  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
  
        const userData = await fetchUserPage(id as string);
  
        if (!userData) {
          throw new Error("Ingen användardata hittades.");
        }
  
        setUser({
          ...userData,
          token: userData.token || "",
        });
      } catch (error) {
        console.error("Fel vid hämtning av användardata:", error);
        setError("Kunde inte hämta användardata.");
      } finally {
        setLoading(false);
      }
    };
  
    if (id) {
      getUserData();
    }
  }, [id]);

  const memberSince = (createdAt: string | undefined) => {
    if (!createdAt) return "Okänt antal dagar";
  
    const createdDate = new Date(createdAt);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
    return `${diffDays} dagar`;
  };

  const handleAddFriend = async () => {
    if (!loggedInUser || !user) {
      console.error("Ingen inloggad användare eller ingen användare att lägga till.");
      return;
    }

    const response = await addFriend(loggedInUser.id, user.id);
    
    if (response) {
      setFriendAdded(true);
      setTimeout(() => setFriendAdded(false), 3000);
    }
  };



  return (
    <>
      <Header />
      <SearchBar />
      <div className="userprofile-container">
        {loading ? (
          <p>Laddar...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : user ? (
          <>
            <div className="userprofile-header">
              <img src="assets/maskot4.webp" alt="avatar" className="userprofile-img" />

              <div className="userprofile-info">
                <h4 className="userprofile-name">{user.nickname}</h4>
                <p className="lunis-since">Lunis i {memberSince(user?.createdAt)}</p>
                <p className="userprofile">Jag gillar:</p>

                <ul className="userprofile-list">
                  {user.interests.length > 0 ? (
                    user.interests.map((interest, index) => (
                      <li key={index}><i className="bi bi-check"></i> {interest}</li>
                    ))
                  ) : (
                    <li>Inga intressen angivna.</li>
                  )}
                </ul>
              </div>

              <button className="add-button" onClick={handleAddFriend} disabled={friendAdded}>
                {friendAdded ? (
                  <i className="bi bi-person-check-fill"></i>
                ) : (
                  <i className="bi bi-person-plus-fill"></i>
                )}
              </button>
            </div>

            <p className="userprofile-about">{user.bio}</p>
          </>
        ) : (
          <p>Ingen användare hittades.</p>
        )}
      </div>
      <NavBar />
    </>
  );
}

export default UserProfilePage;
