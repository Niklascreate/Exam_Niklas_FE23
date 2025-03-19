import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import SearchBar from "../../components/searchbar/SearchBar";
import { fetchUserPage } from '../../../api/api';
import { User } from "../../../interface/interface";
import "./userprofilepage.css";

function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


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
                <p className="userprofile-since">Lunis sedan 2001</p>
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

              <button className="add-button">
                <i className="bi bi-person-plus-fill"></i>
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
