import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPowerOff, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    const day = time.getDate().toString().padStart(2, '0');
    const month = (time.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = time.getFullYear();
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <div className="profile">
          <button className="profile-button">Dr Admin</button>
        </div>
        <div className="search">
          <input type="text" placeholder="Search..." className="search-input" />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
        <div className="date-time">
          {formatTime(currentTime)}
        </div>
        <div className="settings">
          <button className="settings-button">
            <FontAwesomeIcon icon={faCog} />
          </button>
          <button className="logout-button">
            <FontAwesomeIcon icon={faPowerOff} className="red-icon" />
          </button>
        </div>
      </div>
      <div className="content">
        <div className="sidebar">
          <button className="sidebar-item">Tableau de bord</button>
          <button className="sidebar-item">Patients</button>
          <button className="sidebar-item">Statistiques</button>
          <button className="sidebar-item">Administration</button>
          <button className="sidebar-item">Notifications</button>
          <button className="sidebar-item">Paramètres</button>
          <button className="sidebar-item">Profil</button>
        </div>
        <div className="main-content">
          <div className="grid-container">
            <button className="grid-item add-patient">Ajouter patient</button>
            <button className="grid-item agenda">Agenda</button>
            <button className="grid-item activities">Dernières activités</button>
            <button className="grid-item statistics">Statistiques</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
