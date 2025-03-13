import { useState } from "react";
import LoginButton from "../../components/loginbutton/LoginButton";
import RegisterButton from "../../components/registerbutton/RegisterButton";
import LoginModal from "../../components/loginmodal/LoginModal"; // Importera modalen
import "./startpage.css";

function StartPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="startpage-container">
      <h2 className="rubrik">LUNAR<br />CHAT</h2>

      <div className="button-wrapper">
        <LoginButton onClick={() => setShowModal(true)} />
        <RegisterButton />
      </div>

      {showModal && <LoginModal closeModal={() => setShowModal(false)} />}
    </div>
  );
}

export default StartPage;
