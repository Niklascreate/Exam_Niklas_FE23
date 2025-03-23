import { useEffect, useState } from "react";
import { getFriends, getFriendRequests, deleteFriend } from "../../../api/api";
import useUserStore from "../../../store/userStore";
import "./friend.css";
import { Friend, FriendRequest } from "../../../interface/interface";
import FriendRequestModal from '../friendrequestmodal/FriendRequestModal';

const Friends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const loggedInUser = useUserStore((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);


  useEffect(() => {
    if (!loggedInUser?.id) return;

    const fetchFriendRequests = async () => {
      try {
        const data = await getFriendRequests(loggedInUser.id);
        setFriendRequests(data);
      } catch (error) {
        console.error("Kunde inte hämta vänförfrågningar:", error);
      }
    };

    fetchFriendRequests();

    const interval = setInterval(() => {
      fetchFriendRequests();
    }, 5000);

    return () => clearInterval(interval);

  }, [loggedInUser]);


  useEffect(() => {
    const fetchFriends = async () => {
      if (!loggedInUser) return;
      const friendsList = await getFriends(loggedInUser.id);
      setFriends(friendsList);
    };

    fetchFriends();
  }, [loggedInUser]);

  const handleDeleteFriend = async (friendId: string) => {
    if (!loggedInUser?.id) return;
    try {
      await deleteFriend(loggedInUser.id, friendId);
      setFriends((prev) => prev.filter(friend => friend.userId !== friendId));

      setPopupMessage("Vän borttagen!");

      setTimeout(() => {
        setPopupMessage(null);
      }, 3000);

    } catch (err) {
      console.error("Fel vid borttagning av vän:", err);
    }
  };



  return (
    <div className="friends-wrapper">

      <button className="lunis-button notification" onClick={() => setIsModalOpen(true)}>
        Lunis förfrågningar
        {friendRequests.length > 0 && (
          <span className="notification-wrapper">
            <i className="bi bi-heart-fill heart-notify"></i>
            <span className="badge">{friendRequests.length}</span>
          </span>
        )}
      </button>
      <h1 className="friends-title">Mina Lunisvänner</h1>

      {friends.length === 0 ? (
        <p className="no-friends">Du har inga lunisar ännu <i className="bi bi-emoji-frown-fill"></i></p>
      ) : (
        <div className="friends-list">
          {friends.map((friend) => (
            <div key={friend.userId} className="friends-card">
              <div className="friends-container">
                <div className="friends-image-container">
                  <img className="friends-image" src={friend.profileImage} alt={friend.nickname} />
                </div>
                <div className="friends-information">
                  <h2 className="friends-username">{friend.nickname.toUpperCase()}</h2>
                  <p className="friend-realname">{friend.firstname} {friend.lastname}</p>
                  <p className="friends-since">
                    Ni blev Lunisar {friend.createdAt ? new Date(friend.createdAt).toLocaleDateString("sv-SE", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }) : "Okänt datum"}
                  </p>
                </div>
                <div className="friends-delete">
                  <i
                    className="bi bi-heartbreak-fill"
                    onClick={() => friend.userId && handleDeleteFriend(friend.userId)}
                  ></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {isModalOpen && (
        <FriendRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {popupMessage && (
        <div className="popup-delete">
          {popupMessage}
        </div>
      )}

    </div>
  );
};

export default Friends;
