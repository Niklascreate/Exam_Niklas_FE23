import { useState } from "react";
import LoginButton from "../../components/loginbutton/LoginButton";
import RegisterButton from "../../components/registerbutton/RegisterButton";
import LoginModal from "../../components/loginmodal/LoginModal";
import RegisterModal from "../../components/registreramodal/RegisterModal";
import "./startpage.css";

function StartPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <div className="startpage-container">
      <img className="lunarchat-maskot" src="https://lunarchat-profile-images.s3.eu-north-1.amazonaws.com/profile-pictures/maskor-lunarchat.png" alt="avatar" />
      <h2 className="rubrik">LUNAR<br />CHAT</h2>

      <div className="button-wrapper">
        <LoginButton onClick={() => setShowLoginModal(true)} />
        <RegisterButton onClick={() => setShowRegisterModal(true)} />
      </div>

      {showLoginModal && <LoginModal closeModal={() => setShowLoginModal(false)} />}
      {showRegisterModal && <RegisterModal closeModal={() => setShowRegisterModal(false)} />}
    </div>
  );
}

export default StartPage;
