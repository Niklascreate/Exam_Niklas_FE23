import './wallbutton.css';

function WallButton() {
  return (
    <div className="button-container">
      <p className="button-text">LÄMNA ETT LUNISAVTRYCK!</p>
      <span className="wall-pen">
        <i className="bi bi-pencil-fill"></i>
      </span>
    </div>
  );
}

export default WallButton;
