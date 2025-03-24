import  './sendchatmodal.css';

function SendChatModal({ onClose }: { onClose: () => void }) {

  return (
    <div className="chatmodal-container">
      <div className="chatmodal-content">
        <h2 className='chat-rubrik'>Skriv ett lunigt chatmeddelande till din kompis</h2>
        <textarea
          placeholder="Skicka ett roligt meddelande"
          className="chat-textarea-placeholder"
        />
        <div className="chatmodal-buttons">
          <button className="chat-button">SKICKA</button>
          <button className="chat-button" onClick={onClose}>STÄNG</button>
        </div>
      </div>
    </div>
  );
}

export default SendChatModal;
