import { useState } from "react";
import lajvStore from '../../../store/lajvStore';
import useUserStore from "../../../store/userStore";
import './lajvmodal.css';

function LajvModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const addMessage = lajvStore((state) => state.addMessage);
  const { user } = useUserStore();
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (message.trim().length > 0 && message.length <= 30) {
      addMessage(user?.username || "Anonym", message);
      setMessage("");
      onClose();
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>Skicka ett LAJV-meddelande</h2>
        <textarea
          maxLength={30}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Skriv ett lajv så alla lunisar ser..."
          className="textarea-placeholder"
        />
        <div className="modal-buttons">
          <button className="lajv-button" onClick={handleSubmit}>SKICKA</button>
          <button className="lajv-button" onClick={onClose}>STÄNG</button>
        </div>
      </div>
    </div>
  );
}

export default LajvModal;
