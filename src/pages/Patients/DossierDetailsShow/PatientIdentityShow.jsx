import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import icon1 from "../../../assets/icon1.png";
import {
  FaUser,
  FaMapMarkerAlt,
  FaBriefcase,
  FaRegIdBadge,
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaHome, // Import icon for full address
  FaHeart, // Import icon for marital status
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
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
    <div className="flex flex-col items-center p-7">
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
          <div className="flex items-center mb-4">
            <FaUser className="text-blue-500 mr-3 text-xl" />
            <span className="text-lg">
              Nom complet:&nbsp;
              {patient?.nom} {patient?.prenom}
            </span>
          </div>
          <div className="flex items-center mb-4">
            <FaCalendarAlt className="text-green-500 mr-3 text-xl" />
            <span className="text-lg">Âge:&nbsp; {patient?.age} années</span>
          </div>
          <div className="flex items-center mb-4">
            <FaMapMarkerAlt className="text-red-500 mr-3 text-xl" />
            <span className="text-lg">Ville:&nbsp;{patient?.ville}</span>
          </div>
          <div className="flex items-center mb-4">
            <FaBriefcase className="text-purple-500 mr-3 text-xl" />
            <span className="text-lg">
              Profession:&nbsp;{patient?.profession}
            </span>
          </div>
          <div className="flex items-center mb-4">
            <FaMoneyBillAlt className="text-yellow-500 mr-3 text-xl" />
            <span className="text-lg">
              Assurance:&nbsp;{patient?.assurance}
            </span>
          </div>
          <div className="flex items-center mb-4">
            <FaHome className="text-gray-500 mr-3 text-xl" />
            <span className="text-lg">
              Adresse complète:&nbsp;{patient?.fullAddress}
            </span>
          </div>
          <div className="flex items-center mb-4">
            <FaHeart className="text-pink-500 mr-3 text-xl" />
            <span className="text-lg">
              État civil:&nbsp;{patient?.maritalStatus}
            </span>
          </div>
          <div className="flex items-center mb-4">
            <FaMapMarkerAlt className="text-green-500 mr-3 text-xl" />
            <span className="text-lg">Région:&nbsp;{patient?.region}</span>
          </div>
          <div className="flex items-center mb-4">
            <FaRegIdBadge className="text-gray-500 mr-3 text-xl" />
            <span className="text-lg">
              Reference ID:&nbsp; {patient?.referenceID}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end w-full max-w-md mt-6">
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

export default PatientIdentity;
