import React from "react";
import { Link } from "react-router-dom";
import iconStats from "../../assets/iconStats.png";

const Dashboard = () => {
  return (
    <div className="main-content relative">
      <div className="grid-container">
        <Link to="/add-patient" className="grid-item add-patient">
          Ajouter patient
        </Link>
        <Link to="/agenda" className="grid-item agenda">
          Agenda
        </Link>
        <Link to="/patient-list" className="grid-item activities">
          Liste des patients
        </Link>
        <Link to="/statistics" className="grid-item statistics">
          <img src={iconStats} alt="Stats" className="mr-2 align-center w-40" />
          Statistiques
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
