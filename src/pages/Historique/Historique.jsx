import React from "react";
import iconStats from "../../assets/iconStats.png";

const Historique = () => {
  return (
    <div className="main-content">
      <div className="grid-container">
        <button className="grid-item add-patient">Ajouter patient</button>
        <button className="grid-item agenda">Historique</button>
        <button className="grid-item activities">Dernières activités</button>
        <button className="grid-item statistics">
          {" "}
          <img src={iconStats} alt="Stats" className="mr-2 align-center w-40" />
          Statistiques
        </button>{" "}
      </div>
    </div>
  );
};

export default Historique;
