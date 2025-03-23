import { useEffect, useState } from "react";
import useUserStore from "../../../store/userStore";
import './friendrequestmodal.css';
import { FriendRequest } from "../../../interface/interface";
import { getFriendRequests, respondToFriendRequest, rejectFriendRequest } from "../../../api/api";

function FriendRequestModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { user } = useUserStore();
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupType, setPopupType] = useState<"accepted" | "rejected" | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        if (!user?.id) return;
        const data = await getFriendRequests(user.id);
        setRequests(data);
      } catch (err) {
        console.error("Fel vid hämtning av vänförfrågningar", err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && user?.id) {
      fetchRequests();
    }
  }, [isOpen, user]);

  const handleResponse = async (requesterId: string) => {
    try {
      if (!user?.id) return;
      await respondToFriendRequest(requesterId, user.id);
      setRequests((prev) => prev.filter((req) => req.id !== requesterId));
      setPopupMessage("Lunis accepterad");
      setPopupType("accepted");
      setTimeout(() => {
        setPopupMessage(null);
        setPopupType(null);
      }, 3000);
    } catch (err) {
      console.error("Kunde inte acceptera vänförfrågan", err);
    }
  };

  const handleReject = async (requesterId: string) => {
    try {
      if (!user?.id) return;
      await rejectFriendRequest(requesterId, user.id);
      setRequests((prev) => prev.filter((req) => req.id !== requesterId));
      setPopupMessage("Lunis nekad");
      setPopupType("rejected");
      setTimeout(() => {
        setPopupMessage(null);
        setPopupType(null);
      }, 3000);
    } catch (err) {
      console.error("Kunde inte neka vänförfrågan", err);
    }
  };

  return (
    <div className="request-modal-container">
      <div className="request-modal-content">
        <h2>Lunisar som vill bli din vän</h2>

        {loading ? (
          <p className="requests-loading">Laddar vänförfrågningar...</p>
        ) : requests.length === 0 ? (
          <p className="requests-none">Inga nya vänförfrågningar just nu.</p>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="request-card">
              <img src={req.profileImage} alt={req.nickname} className="request-img" />
              <p className="request-nickname">{req.nickname}</p>
              <p className="request-name">{req.firstname} {req.lastname}</p>

              <div className="request-buttons">
                <button
                  onClick={() => req.id && handleResponse(req.id)}
                  className="accept-button"
                >
                  JA
                </button>
                <button
                  onClick={() => req.id && handleReject(req.id)}
                  className="decline-button"
                >
                  NEJ
                </button>
              </div>
            </div>
          ))
        )}

        <button className="request-button" onClick={onClose}>
          STÄNG
        </button>
      </div>

      {popupMessage && (
        <div className={`popup ${popupType === "accepted" ? "popup-accept" : "popup-reject"}`}>
          {popupMessage}
        </div>
      )}
    </div>
  );
}

export default FriendRequestModal;
