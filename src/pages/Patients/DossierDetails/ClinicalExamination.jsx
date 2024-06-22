import React from "react";
import { Link } from "react-router-dom";
import icon6 from "../../../assets/icon6.png";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import HeaderDossier from "../../../components/HeaderDossier";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const ClinicalExamination = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const handlePrevious = () => {
    navigate("/conclusion-primaire", { state: { patient, color } });
  };

  const handleNext = () => {
    navigate("/ecg", { state: { patient, color } });
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
            <img src={icon6} alt="Identité" className="mr-2 align-center w-8" />
            Examen clinique
          </div>
        </div>
        <div className="p-6">
          <Link
            to="/examen-clinique/cardio-vasculaire"
            state={{ patient, color }}
            className="no-underline"
          >
            <button className="bg-gradient-to-b from-[#97bfe4] to-[#3472ab] mt-10 mb-10 border border-black hover:shadow-lg hover:shadow-xl hover:shadow-2xl hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full">
              Cardio vasculaire
            </button>
          </Link>
          <Link
            to="/examen-clinique/pleuro-pulmonaire"
            state={{ patient, color }}
            className="no-underline mt-10"
          >
            <button className="bg-gradient-to-b from-[#97bfe4] to-[#3472ab] mb-10 border border-black hover:shadow-lg hover:shadow-xl hover:shadow-2xl hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full">
              Pleuro pulmonaire
            </button>
          </Link>
          <Link
            to="/examen-clinique/abdominal"
            state={{ patient, color }}
            className="no-underline mt-10"
          >
            <button className="bg-gradient-to-b from-[#97bfe4] to-[#3472ab] mb-10 border border-black hover:shadow-lg hover:shadow-xl hover:shadow-2xl hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full">
              Abdominal
            </button>
          </Link>
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

export default ClinicalExamination;
