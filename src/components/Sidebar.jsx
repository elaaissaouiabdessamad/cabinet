import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Dashboard.css";

const Sidebar = () => {
  const location = useLocation();
  const defaultPath = "/dashboard";

  const [activeLink, setActiveLink] = useState(() => {
    return localStorage.getItem("activeLink") || defaultPath;
  });

  useEffect(() => {
    setActiveLink(location.pathname);
    localStorage.setItem("activeLink", location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (path) => {
    setActiveLink(path);
    localStorage.setItem("activeLink", path);
  };

  const isActive = (path) => {
    if (
      activeLink.startsWith(path) ||
      (path === "/sectors" && activeLink.startsWith("/beds")) ||
      (path === "/sectors" && activeLink.startsWith("/patients")) ||
      (path === "/sectors" && activeLink.startsWith("/dossier")) ||
      (path === "/sectors" && activeLink.startsWith("/show")) ||
      (path === "/sectors" && activeLink.startsWith("/patient-identity")) ||
      (path === "/sectors" &&
        activeLink.startsWith("/motif-hospitalisation")) ||
      (path === "/sectors" && activeLink.startsWith("/antecedents")) ||
      (path === "/sectors" && activeLink.startsWith("/histoire-maladie")) ||
      (path === "/sectors" && activeLink.startsWith("/conclusion-primaire")) ||
      (path === "/sectors" && activeLink.startsWith("/examen-clinique")) ||
      (path === "/sectors" && activeLink.startsWith("/ecg")) ||
      (path === "/sectors" && activeLink.startsWith("/conclusion")) ||
      (path === "/sectors" && activeLink.startsWith("/diagnostic")) ||
      (path === "/sectors" && activeLink.startsWith("/exploration")) ||
      (path === "/sectors" && activeLink.startsWith("/biologie")) ||
      (path === "/dashboard" && activeLink.startsWith("/add-patient")) ||
      (path === "/dashboard" && activeLink.startsWith("/patient-list")) ||
      (path === "/dashboard" && activeLink.startsWith("/archived-patients"))
    ) {
      return "active";
    }
    return "";
  };

  return (
    <div className="sidebar">
      <Link
        to="/dashboard"
        className={`sidebar-item text-center ${isActive("/dashboard")}`}
        onClick={() => handleLinkClick("/dashboard")}
      >
        Tableau de bord
      </Link>
      <Link
        to="/sectors"
        className={`sidebar-item text-center ${isActive("/sectors")}`}
        onClick={() => handleLinkClick("/sectors")}
      >
        Patients
      </Link>
      <Link
        to="/historique"
        className={`sidebar-item text-center ${isActive("/historique")}`}
        onClick={() => handleLinkClick("/historique")}
      >
        Historique
      </Link>
      <Link
        to="/agenda"
        className={`sidebar-item text-center ${isActive("/agenda")}`}
        onClick={() => handleLinkClick("/agenda")}
      >
        Agenda
      </Link>
      <Link
        to="/pharmacie"
        className={`sidebar-item text-center ${isActive("/pharmacie")}`}
        onClick={() => handleLinkClick("/pharmacie")}
      >
        Pharmacie
      </Link>
      <Link
        to="/parametres"
        className={`sidebar-item text-center ${isActive("/parametres")}`}
        onClick={() => handleLinkClick("/parametres")}
      >
        Paramètres
      </Link>
      <Link
        to="/profil"
        className={`sidebar-item text-center ${isActive("/profil")}`}
        onClick={() => handleLinkClick("/profil")}
      >
        Profil
      </Link>
    </div>
  );
};

export default Sidebar;
