import React, { useState } from "react";
import { Link } from "react-router-dom";
import icon2 from "../../../assets/icon2.png";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ReasonHospitalizationDisplay from "../Forms/ReasonHospitalizationDisplay";
import HeaderDossierShow from "../../../components/HeaderDossierShow";
const ReasonHospitalization = () => {
  const [reasonUpdate, setReasonUpdate] = useState(""); // Lifted state
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const handlePrevious = () => {
    navigate("/show/patient-identity", { state: { patient, color } });
  };

  const handleNext = () => {
    navigate("/show/antecedents", { state: { patient, color } });
  };
  const handleDossierShow = () => {
    navigate(`/dossier/show/${patient.medicalDossier.id}`, {
      state: { patient, color },
    });
  };
  return (
    <div className="flex flex-col items-center p-10">
      <HeaderDossierShow handleDossierShow={handleDossierShow} />
      <div className={`mb-6 text-${color} font-bold`}>
        Mr Patient {patient?.prenom} {patient?.nom}
      </div>{" "}
      <div className="bg-white border border-black rounded-3xl shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-black justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img src={icon2} alt="Identité" className="mr-2 align-center w-8" />
            Motif d'hospitalisation
          </div>
        </div>
        <div className="pb-6 m-6">
          <ReasonHospitalizationDisplay
            patientId={patient.id}
            reasonUpdate={reasonUpdate}
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
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ReasonHospitalization;
