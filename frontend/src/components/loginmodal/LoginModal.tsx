import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../api/api";
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

    if (!nickname || !password) {
      setError("Fyll i både nickname och lösenord.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(nickname, password);

      if (!response.user || !response.token) {
        throw new Error("Inloggning misslyckades");
      }

      const { user, token } = response;

      setUser({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        nickname: user.nickname,
        email: user.email,
        token: token,
      });

      console.log("Inloggad som:", user.nickname);

      if (closeModal) closeModal();
      navigate("/landingpage");

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Inloggning misslyckades.");
      }
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
