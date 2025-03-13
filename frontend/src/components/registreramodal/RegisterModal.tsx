import { motion } from "framer-motion";
import "./registermodal.css";

function RegisterModal({ closeModal }: { closeModal?: () => void }) {
  return (
    <motion.div
      className="registrera-modal__container"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <button className="close-modal__button" onClick={closeModal}>
        <i className="bi bi-x-square-fill"></i>
      </button>

      <form className="registrera-modal__form">
        <div className="registrera-modal__input-wrapper">
          <label className="registrera-modal__label">FÖRNAMN</label>
          <input type="text" className="registrera-modal__input" placeholder="förnamn" />
        </div>
        <div className="registrera-modal__input-wrapper">
          <label className="registrera-modal__label">EFTERNAMN</label>
          <input type="text" className="registrera-modal__input" placeholder="efternamn" />
        </div>
        <div className="registrera-modal__input-wrapper">
          <label className="registrera-modal__label">NICKNAME</label>
          <input type="text" className="registrera-modal__input" placeholder="nickname" />
        </div>
        <div className="registrera-modal__input-wrapper">
          <label className="registrera-modal__label">MEJL</label>
          <input type="text" className="registrera-modal__input" placeholder="mejl" />
        </div>
        <div className="registrera-modal__input-wrapper">
          <label className="registrera-modal__label">LÖSENORD</label>
          <input type="password" className="registrera-modal__input" placeholder="minst 8 tecken..." />
        </div>
        <button className="registrera-modal__button">
          REGISTRERA MIG <i className="bi bi-arrow-right-short"></i>
        </button>
      </form>
    </motion.div>
  );
}

export default RegisterModal;
