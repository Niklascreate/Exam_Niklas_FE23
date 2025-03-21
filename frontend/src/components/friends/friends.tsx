import { useEffect, useState } from "react";
import { getFriends } from "../../../api/api";
import useUserStore from "../../../store/userStore";
import "./friend.css";
import { Friend } from "../../../interface/interface";

const Friends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const loggedInUser = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchFriends = async () => {
      if (!loggedInUser) return;
      const friendsList = await getFriends(loggedInUser.id);
      console.log("🔍 API-svar för vänner:", friendsList);
      setFriends(friendsList);
    };

    fetchFriends();
  }, [loggedInUser]);

  return (
    <div className="friends-wrapper">
      <h1 className="friends-title">Mina Lunisvänner</h1>

      {friends.length === 0 ? (
        <p className="no-friends">Du har inga lunisar ännu.</p>
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
                  <i className="bi bi-heart"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Friends;
