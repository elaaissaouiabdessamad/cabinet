import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/dashboard" className="sidebar-item text-center">
        Tableau de bord
      </Link>
      <Link to="/sectors" className="sidebar-item text-center">
        Patients
      </Link>
      <Link to="/statistiques" className="sidebar-item text-center">
        Statistiques
      </Link>
      <Link to="/administration" className="sidebar-item text-center">
        Administration
      </Link>
      <Link to="/notifications" className="sidebar-item text-center">
        Notifications
      </Link>
      <Link to="/parametres" className="sidebar-item text-center">
        Paramètres
      </Link>
      <Link to="/profil" className="sidebar-item text-center">
        Profil
      </Link>
    </div>
  );
};

export default Sidebar;
