import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faPowerOff, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";

const Header = ({ currentTime, formatTime }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout endpoint
      await axios.post("http://localhost:3000/api/auth/logout");

      // Perform any necessary cleanup, such as removing authentication tokens
      navigate("/login"); // Navigate to the login page
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle the error, show a message to the user, etc.
    }
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
