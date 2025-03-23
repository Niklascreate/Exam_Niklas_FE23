import { useState } from "react";
import { addWallMessage } from "../../../api/api";
import useUserStore from "../../../store/userStore";
import "./wallmessage.css";
import { WallMessageType } from "../../../interface/interface";


function WallMessage({ onClose, onNewMessage }: { onClose: () => void; onNewMessage: (message: WallMessageType) => void }) {
  const [message, setMessage] = useState("");
  const user = useUserStore((state) => state.user);

  const handleSendMessage = async () => {
    if (!user) {
      console.error("hoppsan!.");
      return;
    }

    if (message.trim().length > 0) {
      const newPost = await addWallMessage(user.id, message);
      if (newPost) {
        onNewMessage(newPost);
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
        />
        <div className="wallmodal-buttons">
          <button className="wall-button" onClick={handleSendMessage}>SKICKA</button>
          <button className="wall-button" onClick={onClose}>STÄNG</button>
        </div>
      </div>
    </div>
  );
}

export default WallMessage;
