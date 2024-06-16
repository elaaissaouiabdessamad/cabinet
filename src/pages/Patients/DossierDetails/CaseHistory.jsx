import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import icon3 from "../../../assets/icon3.png";
import AddAntecedentForm from "../Forms/AddAntecedentForm";
import HeaderDossier from "../../../components/HeaderDossier";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const CaseHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;
  const [antecedentUpdate, setAntecedentUpdate] = useState("");

  const handlePrevious = () => {
    navigate("/motif-hospitalisation", { state: { patient, color } });
  };

  const handleNext = () => {
    navigate("/histoire-maladie", { state: { patient, color } });
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
        Mr Patient{" "}
        <span className="text-gray-500">
          {patient?.prenom} {patient?.nom}
        </span>
        , ref:<span className="text-gray-500"> {patient?.referenceID}</span>
      </div>
      <div className="bg-white border border-black rounded-3xl shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-black justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img src={icon3} alt="Identité" className="mr-2 align-center w-8" />
            Antécédents
          </div>
        </div>
        <div className="p-6">
          <AddAntecedentForm
            patientId={patient?.id}
            setAntecedentUpdate={setAntecedentUpdate}
          />
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
          <FontAwesomeIcon icon="fa-duotone fa-arrow-right" /> Suivant
        </button>
      </div>
    </div>
  );
};

export default CaseHistory;
