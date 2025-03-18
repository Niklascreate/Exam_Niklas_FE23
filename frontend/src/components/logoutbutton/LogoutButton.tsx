import { logoutUser } from '../../../api/api';
import { useNavigate } from "react-router-dom";
import useUserStore from '../../../store/userStore';
import "./logoutbutton.css";

function LogoutButton() {
  const navigate = useNavigate();
  const { user, clearUser } = useUserStore();

  const handleLogout = async () => {
    if (!user) {
      console.error("Ingen användare inloggad.");
      return;
    }

    try {
      const response = await logoutUser(user.id);
      if (response) {
        console.log("Utloggning lyckades:", response.message);

        clearUser();

        navigate("/");
      }
    } catch (error) {
      console.error("Fel vid utloggning:", error);
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      <p>Logga ut</p>
    </button>
  );
}

export default LogoutButton;
