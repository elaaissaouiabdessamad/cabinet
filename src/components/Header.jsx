import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faPowerOff, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import LogoutModal from "./LogoutModal";

const Header = ({ currentTime, formatTime, username, logout }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const searchPaths = {
    "tableau de bord": "/dashboard",
    patients: "/sectors",
    historique: "/historique",
    agenda: "/agenda",
    pharmacie: "/pharmacie",
    paramètres: "/parametres",
    profil: "/profil",
    "secteur usi": "/patients/1",
    "secteur froid": "/patients/2",
    secteurs: "/sectors",
    "liste patients": "/patient-list",
    "salle de cathétérisme": "/salle-catheterisme",
    "bloc de rythmologie": "bloc-rythmologie",
    "garde de médecins": "/garde-des-medecins",
    "garde des infirmières": "/garde-des-infirmieres",
    "ajouter patient": "/add-patient",
  };

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

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    const path = searchPaths[query];
    if (path) {
      navigate(path);
    } else {
      console.log("No matching path for search query:", query);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(e.target.value);
    if (query) {
      const newSuggestions = Object.keys(searchPaths).filter((key) =>
        key.toLowerCase().includes(query)
      );
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    navigate(searchPaths[suggestion.toLowerCase()]);
  };

  return (
    <div className="header">
      <button class="profile-button flex justify-center">Dr {username}</button>
      <form onSubmit={handleSearch} className="search flex flex-row relative">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="search-input"
          value={searchQuery}
          onChange={handleInputChange}
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-10 z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </form>
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
