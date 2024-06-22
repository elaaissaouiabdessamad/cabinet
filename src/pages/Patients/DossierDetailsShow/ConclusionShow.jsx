import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConclusionDisplay from "../Forms/ConclusionDisplay";
import icon8 from "../../../assets/icon8.png";
import HeaderDossierShow from "../../../components/HeaderDossierShow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Conclusion = () => {
  const [conclusionUpdate, setConclusionUpdate] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;
  const handlePrevious = () => {
    navigate("/show/ecg", { state: { patient, color } });
  };

  const handleNext = () => {
    navigate("/show/diagnostic", { state: { patient, color } });
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
        Mr Patient{" "}
        <span className="text-gray-500">
          {patient?.prenom} {patient?.nom}
        </span>
        , ref:<span className="text-gray-500"> {patient?.referenceID}</span>
      </div>
      <div className="bg-white border border-black rounded-3xl shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-black justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img src={icon8} alt="Identité" className="mr-2 align-center w-8" />
            Conclusion
          </div>
        </div>
        <div className="pb-2 m-6">
          <ConclusionDisplay
            patientId={patient?.id}
            conclusionUpdate={conclusionUpdate}
          />
        </div>
      </div>
      <div className="flex justify-between w-full max-w-md mt-6">
        <button
          onClick={handlePrevious}
          className="bg-white hover:bg-blue-200 border-white hover:border-blue-200 border text-blue-500 font-bold py-2 px-4 rounded-lg"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Précédent
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Suivant <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default Conclusion;
