import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Dashboard.css";

const Sidebar = () => {
  const location = useLocation();
  const defaultPath = "/accueil";

  const [activeLink, setActiveLink] = useState(() => {
    return localStorage.getItem("activeLink") || defaultPath;
  });

  const [dashboardSubmenuVisible, setDashboardSubmenuVisible] = useState(false);
  const [mapSubmenuVisible, setMapSubmenuVisible] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname);
    localStorage.setItem("activeLink", location.pathname);

    // Close submenu if the active link is not a dashboard link
    if (!location.pathname.startsWith("/dashboard")) {
      setDashboardSubmenuVisible(false);
    }
    if (!location.pathname.startsWith("/sectors")) {
      setMapSubmenuVisible(false);
    }
  }, [location.pathname]);

  const handleLinkClick = (path) => {
    setActiveLink(path);
    localStorage.setItem("activeLink", path);

    if (path === "/sectors") {
      setMapSubmenuVisible(!mapSubmenuVisible);
    } else if (path.startsWith("/sectors")) {
      setMapSubmenuVisible(true);
    } else {
      setMapSubmenuVisible(false);
    }

    if (path === "/dashboard") {
      setDashboardSubmenuVisible(!dashboardSubmenuVisible);
    } else if (path.startsWith("/dashboard")) {
      setDashboardSubmenuVisible(true);
    } else {
      setDashboardSubmenuVisible(false);
    }
  };

  const isActive = (path) => {
    if (
      activeLink.startsWith(path) ||
      (path === "/sectors" && activeLink.startsWith("/sectors-show")) ||
      (path === "/sectors" && activeLink.startsWith("/sectors-statistics")) ||
      (path === "/sectors" && activeLink.startsWith("/sectors-table")) ||
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
      (path === "/accueil" && activeLink.startsWith("/add-patient")) ||
      (path === "/accueil" && activeLink.startsWith("/patient-list")) ||
      (path === "/accueil" && activeLink.startsWith("/archived-patients")) ||
      (path === "/agenda" && activeLink.startsWith("/bloc-rythmologie")) ||
      (path === "/agenda" && activeLink.startsWith("/salle-catheterisme")) ||
      (path === "/agenda" && activeLink.startsWith("/garde-des-medecins")) ||
      (path === "/agenda" && activeLink.startsWith("/garde-des-infirmieres")) ||
      (path === "/sectors" && activeLink.startsWith("/preview-pdf")) ||
      (path === "/dashboard" && activeLink.startsWith("/dashboard-patient")) ||
      (path === "/dashboard" && activeLink.startsWith("/dashboard-pharmacie"))
    ) {
      return "active";
    }
    return "";
  };

  return (
    <div className="sidebar">
      <Link
        to="/accueil"
        className={`sidebar-item text-center ${isActive("/accueil")}`}
        onClick={() => handleLinkClick("/accueil")}
      >
        Accueil
      </Link>
      <div
        className={`sidebar-item text-center ${isActive("/sectors")}`}
        onClick={() => handleLinkClick("/sectors")}
      >
        MAP
      </div>
      {mapSubmenuVisible && (
        <div className="submenu flex flex-row">
          <Link
            to="/sectors-show"
            className={`w-1/3 submenu-item text-center ${isActive(
              "/sectors-show"
            )}`}
            onClick={() => handleLinkClick("/sectors-show")}
          >
            Secteur
          </Link>
          <Link
            to="/sectors-statistics"
            className={`w-1/3 submenu-item text-center ${isActive(
              "/sectors-statistics"
            )}`}
            onClick={() => handleLinkClick("/sectors-statistics")}
          >
            Stats
          </Link>
          <Link
            to="/sectors-table"
            className={`w-1/3 submenu-item text-center ${isActive(
              "/sectors-table"
            )}`}
            onClick={() => handleLinkClick("/sectors-table")}
          >
            Table
          </Link>
        </div>
      )}
      <Link
        to="/historique"
        className={`sidebar-item text-center border-t border-black ${isActive(
          "/historique"
        )}`}
        onClick={() => handleLinkClick("/historique")}
      >
        Historique
      </Link>
      <div
        className={`sidebar-item text-center border-t border-black ${isActive(
          "/dashboard"
        )}`}
        onClick={() => handleLinkClick("/dashboard")}
      >
        Tableau de bord
      </div>
      {dashboardSubmenuVisible && (
        <div className="submenu flex flex-row">
          <Link
            to="/dashboard-patient"
            className={`submenu-item text-center ${isActive(
              "/dashboard-patient"
            )}`}
            onClick={() => handleLinkClick("/dashboard-patient")}
          >
            Patient
          </Link>
          <Link
            to="/dashboard-pharmacie"
            className={`submenu-item text-center ${isActive(
              "/dashboard-pharmacie"
            )}`}
            onClick={() => handleLinkClick("/dashboard-pharmacie")}
          >
            Pharmacie
          </Link>
        </div>
      )}
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
