import './wallmessage.css';

function WallMessage() {
  return (
<div className="wallmodal-container">
  <div className="wallmodal-content">
    <h2>Skriv något lunigt</h2>
    <textarea
      placeholder="LunarChats vägg för att rastlösa lunisar..."
      className="wall-textarea-placeholder"
    ></textarea>
    <div className="wallmodal-buttons">
      <button className="wall-button">SKICKA</button>
      <button className="wall-button">STÄNG</button>
    </div>
  </div>
</div>

  )
}

export default WallMessage
