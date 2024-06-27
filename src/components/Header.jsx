import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faPowerOff, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import LogoutModal from "./LogoutModal";

const Header = ({ currentTime, formatTime, username, logout }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout");
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleIconClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setShowModal(false);
  };

  return (
    <div className="header">
      <div className="profile mr-4">
        <button className="profile-button">Dr {username}</button>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Rechercher..."
          className="search-input"
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
      <div className="date-time w-60">{formatTime(currentTime)}</div>
      <div className="settings flex items-center mr-4">
        <Link
          to="/parametres"
          className="text-blue-500 hover:underline hover:text-blue-700"
        >
          <button className="settings-button text-xl">
            <FontAwesomeIcon icon={faCog} />
          </button>
        </Link>
        <button
          className="ml-8 text-red-500 hover:text-red-700 text-xl"
          onClick={handleIconClick}
        >
          <FontAwesomeIcon icon={faPowerOff} />
        </button>
      </div>
      <LogoutModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default Header;
