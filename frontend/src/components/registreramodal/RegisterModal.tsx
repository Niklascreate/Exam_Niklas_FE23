import { motion } from "framer-motion";
import "./registermodal.css";
import { RegisterData } from "../../../interface/interface";
import { registerUser } from "../../../api/api";
import { useState } from "react";


function RegisterModal({ closeModal }: { closeModal?: () => void }) {
  const [formData, setFormData] = useState<RegisterData>({
    firstname: "",
    lastname: "",
    nickname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!formData.firstname || !formData.lastname || !formData.nickname || !formData.email || !formData.password) {
      setError("Fyll i alla fält.");
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser(formData);
      console.log("Registrering lyckades:", response);

      if (closeModal) closeModal();
    } catch {
      setError("Registrering misslyckades. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="registrera-modal__container"
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

      <form className="registrera-modal__form" onSubmit={handleRegister}>
        {error && <p className="error-message">{error}</p>}

        <div className="registrera-modal__input-wrapper">
          <label className="registrera-modal__label">FÖRNAMN</label>
          <input
            type="text"
            className="registrera-modal__input"
            name="firstname"
            placeholder="förnamn"
            value={formData.firstname}
            onChange={handleChange}
          />
        </div>

        <div className="registrera-modal__input-wrapper">
          <label className="registrera-modal__label">EFTERNAMN</label>
          <input
            type="text"
            className="registrera-modal__input"
            name="lastname"
            placeholder="efternamn"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>

        <div className="registrera-modal__input-wrapper">
          <label className="registrera-modal__label">NICKNAME</label>
          <input
            type="text"
            className="registrera-modal__input"
            name="nickname"
            placeholder="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
        </div>

        <div className="registrera-modal__input-wrapper">
          <label className="registrera-modal__label">MEJL</label>
          <input
            type="email"
            className="registrera-modal__input"
            name="email"
            placeholder="mejl"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="registrera-modal__input-wrapper">
          <label className="registrera-modal__label">LÖSENORD</label>
          <input
            type="password"
            className="registrera-modal__input"
            name="password"
            placeholder="minst 8 tecken..."
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button className="registrera-modal__button" type="submit" disabled={loading}>
          {loading ? "Registrerar..." : <>REGISTRERA MIG <i className="bi bi-arrow-right-short"></i></>}
        </button>
      </form>
    </motion.div>
  );
}

export default RegisterModal;