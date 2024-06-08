import React, { useState } from "react";
import iconStats from "../../assets/iconStats.png";
import AddPatientForm from "./AddPatientForm";

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddPatientClick = () => {
    setShowForm(true);
  };

  const handlePatientAdded = () => {
    setShowForm(false);
    // Optionally, add code to refresh the patient list or show a success message
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="main-content relative">
      <div className="grid-container">
        <button
          className="grid-item add-patient"
          onClick={handleAddPatientClick}
        >
          Ajouter patient
        </button>
        <button className="grid-item agenda">Agenda</button>
        <button className="grid-item activities">Dernières activités</button>
        <button className="grid-item statistics">
          <img src={iconStats} alt="Stats" className="mr-2 align-center w-40" />
          Statistiques
        </button>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-700"
              onClick={handleCloseForm}
            >
              &times;
            </button>
            <AddPatientForm onPatientAdded={handlePatientAdded} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
