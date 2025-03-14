import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, fetchUser } from "../../../api/api";
import useUserStore from "../../../store/userStore";
import { motion } from "framer-motion";
import "./loginmodal.css";

function LoginModal({ closeModal }: { closeModal?: () => void }) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useState(() => {
    inputRef.current?.focus();
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    console.log("Försöker logga in med:", { nickname, password });
  
    if (!nickname || !password) {
      setError("Fyll i både nickname och lösenord.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await loginUser(nickname, password);
      console.log("API-svar från backend:", response);
  
      if (!response.user || !response.token) {
        throw new Error("Inloggning misslyckades");
      }

      setUser({
        id: response.user.id,
        firstname: response.user.firstname,
        lastname: response.user.lastname,
        nickname: response.user.nickname,
        email: response.user.email,
        token: response.token,
      });

      console.log("Användaren är inloggad:", response.user);

      // 🔥 Hämta fullständig användardata med `id`
      await fetchUser(response.user.id, response.token);
  
      setUser({
        id: response.user.id,
        firstname: response.user.firstname,
        lastname: response.user.lastname,
        nickname: response.user.nickname,
        email: response.user.email,
        token: response.token,
      });
  
      console.log("Användaren är inloggad:", response.user);
  
      if (closeModal) closeModal();
      navigate("/landingpage");
  
    } catch (err) {
      console.error("Inloggningsfel:", err);
      setError((err instanceof Error ? err.message : "Inloggning misslyckades."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="login-modal__container"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="close-modal___container">
        <button className="close-modal__button" onClick={closeModal}>
          <i className="bi bi-x-square-fill"></i>
        </button>
      </div>

      <form className="login-modal__form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <div className="login-modal__input-wrapper">
          <label className="login-modal__label">NICKNAME</label>
          <input
            ref={inputRef}
            className="login-modal__input"
            type="text"
            placeholder="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div className="login-modal__input-wrapper">
          <label className="login-modal__label">LÖSENORD</label>
          <input
            className="login-modal__input"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-modal__button" type="submit" disabled={loading}>
          {loading ? "Loggar in..." : <>LOGGA IN MIG <i className="bi bi-arrow-right-short"></i></>}
        </button>
      </form>
    </motion.div>
  );
}

export default LoginModal;
