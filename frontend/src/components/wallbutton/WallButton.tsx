import './wallbutton.css';

function WallButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="button-container" onClick={onClick}>
      <p className="button-text">LÄMNA ETT LUNISAVTRYCK!</p>
      <span className="wall-pen">
        <i className="bi bi-pencil-fill"></i>
      </span>
    </div>
  );
}

export default WallButton;
