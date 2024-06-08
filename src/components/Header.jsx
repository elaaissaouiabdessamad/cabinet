import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faPowerOff, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Header = ({ currentTime, formatTime }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any necessary cleanup, such as removing authentication tokens
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="header">
      <div className="profile mr-4">
        <button className="profile-button">Dr Admin</button>
      </div>
      <div className="search">
        <input type="text" placeholder="Search..." className="search-input" />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
      <div className="date-time">{formatTime(currentTime)}</div>
      <div className="settings">
        <button className="settings-button">
          <FontAwesomeIcon icon={faCog} />
        </button>
        <button className="pl-8 logout-button pr-4" onClick={handleLogout}>
          <FontAwesomeIcon icon={faPowerOff} className="red-icon" />
        </button>
      </div>
    </div>
  );
};

export default Header;
