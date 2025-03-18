import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./searchbar.css";
import { User } from "../../../interface/interface";
import { fetchUsers } from "../../../api/api";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      if (data && data.users) {
        setUsers(data.users);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers([]);
      setShowDropdown(false);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = users.filter((user) =>
      user.firstname.toLowerCase().includes(lowerCaseSearch) ||
      user.lastname.toLowerCase().includes(lowerCaseSearch) ||
      user.nickname.toLowerCase().includes(lowerCaseSearch)
    );

    setFilteredUsers(filtered);
    setShowDropdown(filtered.length > 0);
  }, [searchTerm, users]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUserClick = (user: User) => {
    console.log(`Vald användare: ${user.nickname}`);
    setSearchTerm("");
    setShowDropdown(false);
    navigate(`/profile/${user.id}`);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <input
        type="text"
        className="search-input"
        placeholder="SÖK EFTER LUNISAR..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowDropdown(filteredUsers.length > 0)}
      />
      <button className="search-button">Sök</button>

      {showDropdown && (
        <ul className="search-results">
          {filteredUsers.map((user) => (
            <li key={user.id} className="search-result-item" onClick={() => handleUserClick(user)}>
              <strong><span className="snabela">@</span>{user.nickname}</strong>   <i className="bi bi-person-fill"></i>{user.firstname} {user.lastname}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
