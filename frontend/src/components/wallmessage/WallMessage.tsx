import { useState } from "react";
import { sendWallMessage } from '../../../api/api';
import './wallmessage.css';

function WallMessage({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (message.trim().length > 0) {
      const success = await sendWallMessage(message);
      if (success) {
        setMessage("");
        onClose();
      }
    }
  };

  return (
    <div className="wallmodal-container">
      <div className="wallmodal-content">
        <h2>Skriv något lunigt</h2>
        <textarea
          placeholder="LunarChats vägg för rastlösa lunisar..."
          className="wall-textarea-placeholder"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div className="wallmodal-buttons">
          <button className="wall-button" onClick={handleSendMessage}>SKICKA</button>
          <button className="wall-button" onClick={onClose}>STÄNG</button>
        </div>
      </div>
    </div>
  );
}

export default WallMessage;
