import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import icon1 from "../../../assets/icon1.png";
import {
  FaUser,
  FaMapMarkerAlt,
  FaBriefcase,
  FaIdCard,
  FaMoneyBillAlt,
} from "react-icons/fa";

import HeaderDossierShow from "../../../components/HeaderDossierShow";

const PatientIdentity = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const handleNext = () => {
    navigate("/show/motif-hospitalisation", { state: { patient, color } });
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
            <img src={icon1} alt="Identité" className="mr-2 align-center w-8" />
            Identité
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-2">
            <FaIdCard className="text-gray-500 mr-2" />
            <span className="text-lg">{patient?.nom}</span>
          </div>
          <div className="flex items-center mb-2">
            <FaIdCard className="text-gray-500 mr-2" />
            <span className="text-lg">{patient?.prenom}</span>
          </div>
          <div className="flex items-center mb-2">
            <FaIdCard className="text-gray-500 mr-2" />
            <span className="text-lg">{patient?.age}</span>
          </div>
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <span className="text-lg">{patient?.ville}</span>
          </div>
          <div className="flex items-center mb-2">
            <FaBriefcase className="text-gray-500 mr-2" />
            <span className="text-lg">{patient?.profession}</span>
          </div>
          <div className="flex items-center mb-2">
            <FaMoneyBillAlt className="text-gray-500 mr-2" />
            <span className="text-lg">{patient?.assurance}</span>
          </div>
          <div className="flex items-center mb-2">
            <FaIdCard className="text-gray-500 mr-2" />
            <span className="text-lg">{patient?.id}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end w-full max-w-md mt-6">
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

export default PatientIdentity;
