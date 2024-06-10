import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import icon9 from "../../../assets/icon9.png";
import AddDiagnosticForm from "../Forms/AddDiagnosticForm"; // Import the new form component
import HeaderDossier from "../../../components/HeaderDossier";
const Diagnostic = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;
  const handlePrevious = () => {
    navigate("/conclusion", { state: { patient, color } });
  };

  const handleNext = () => {
    navigate("/exploration", { state: { patient, color } });
  };

  const handleDossier = () => {
    navigate(`/dossier/${patient.medicalDossier.id}`, {
      state: { patient, color },
    });
  };
  return (
    <div className="flex flex-col items-center p-10">
      <HeaderDossier handleDossier={handleDossier} />
      <div className={`mb-6 text-${color} font-bold`}>
        Mr Patient {patient?.prenom} {patient?.nom}
      </div>{" "}
      <div className="bg-white border border-black rounded-3xl shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-black justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img src={icon9} alt="Identité" className="mr-2 align-center w-8" />
            Diagnostic
          </div>
        </div>
        <div className="p-6 mt-7">
          <AddDiagnosticForm patientId={patient?.id} />
        </div>
      </div>
      <div className="flex justify-between w-full max-w-md mt-6">
        <button
          onClick={handlePrevious}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-lg"
        >
          Précédent
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Diagnostic;
