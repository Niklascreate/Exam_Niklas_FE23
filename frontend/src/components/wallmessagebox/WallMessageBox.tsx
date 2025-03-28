import './wallmessagebox.css';
import { WallMessageProps } from "../../../interface/interface";
import { useNavigate } from "react-router-dom";
import useUserStore from '../../../store/userStore';

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

function WallMessageBox({ userId, profileImage, nickname, message, createdAt }: WallMessageProps) {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const handleClick = () => {
      if (userId) {
          navigate(`/userprofilepage/${userId}`);
      } else {
          console.error("userId saknas! Kan inte navigera.");
      }
  };

  const displayImage = profileImage || (user?.id === userId ? user?.profileImage : "https://lunarchat-profile-images.s3.eu-north-1.amazonaws.com/profile-pictures/maskot2+(2).webp");

    return (
        <div className="wall-container" onClick={handleClick} style={{ cursor: "pointer" }}>
            <div className="wall-content">
            <img src={displayImage} alt="Profilbild" className="user-img" />
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
