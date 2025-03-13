import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../api/api";
import useUserStore from "../../../store/userStore";
import "./loginmodal.css";

function LoginModal({ closeModal }: { closeModal?: () => void }) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Sätter fokus på nickname-fältet när modalen öppnas
  useState(() => {
    inputRef.current?.focus();
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Om fälten är tomma, stoppa anropet
    if (!nickname || !password) {
      setError("Fyll i både nickname och lösenord.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(nickname, password);
      setUser(response.user); // Sparar hela User-objektet i Zustand

      console.log("Inloggad som:", response.user);

      if (closeModal) closeModal(); // Stäng modal
      navigate("/landingpage"); // Navigera till landingpage

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Visa API:s felmeddelande
      } else {
        setError("Inloggning misslyckades.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-modal__container">
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
          {loading ? "Loggar in..." : "LOGGA IN MIG"}
        </button>
      </form>
    </div>
  );
}

export default LoginModal;
