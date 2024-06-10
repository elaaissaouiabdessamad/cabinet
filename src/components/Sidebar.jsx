import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(() => {
    // Retrieve the initial active link from local storage, or default to "/dashboard"
    return localStorage.getItem("activeLink") || "/dashboard";
  });

  useEffect(() => {
    // Set the active link in local storage whenever it changes
    localStorage.setItem("activeLink", activeLink);
  }, [activeLink]);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="sidebar">
      <Link
        to="/dashboard"
        className={`sidebar-item text-center ${
          activeLink === "/dashboard" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("/dashboard")}
      >
        Tableau de bord
      </Link>
      <Link
        to="/sectors"
        className={`sidebar-item text-center ${
          activeLink === "/sectors" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("/sectors")}
      >
        Patients
      </Link>
      <Link
        to="/historique"
        className={`sidebar-item text-center ${
          activeLink === "/historique" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("/historique")}
      >
        Historique
      </Link>
      <Link
        to="/facturation"
        className={`sidebar-item text-center ${
          activeLink === "/facturation" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("/facturation")}
      >
        Facturation
      </Link>
      <Link
        to="/notifications"
        className={`sidebar-item text-center ${
          activeLink === "/notifications" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("/notifications")}
      >
        Notifications
      </Link>
      <Link
        to="/parametres"
        className={`sidebar-item text-center ${
          activeLink === "/parametres" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("/parametres")}
      >
        Paramètres
      </Link>
      <Link
        to="/profil"
        className={`sidebar-item text-center ${
          activeLink === "/profil" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("/profil")}
      >
        Profil
      </Link>
    </div>
  );
};

export default Sidebar;
