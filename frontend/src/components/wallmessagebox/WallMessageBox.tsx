import './wallmessagebox.css';
import { WallMessageProps } from "../../../interface/interface";

function formatDate(isoDate: string) {
    const date = new Date(isoDate);
    return date.toLocaleString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  
  function WallMessageBox({ nickname, message, createdAt }: WallMessageProps) {
    return (
      <div className="wall-container">
        <div className="wall-content">
          <img src="" alt="" className="user-img" />
          <span className="wallpost-username">{nickname}</span>
          <span className="wallpost-time">{formatDate(createdAt)}</span>
        </div>
        <div className="wallpost-message">
          <p>{message}</p>
        </div>
      </div>
    );
  }
  
  export default WallMessageBox;