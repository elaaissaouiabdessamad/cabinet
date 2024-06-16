import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import PatientService from "../../services/patient.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";

import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import icon4 from "../../assets/icon4.png";
import icon5 from "../../assets/icon5.png";
import icon6 from "../../assets/icon6.png";
import icon7 from "../../assets/icon7.png";
import icon8 from "../../assets/icon8.png";
import icon9 from "../../assets/icon9.png";
import icon10 from "../../assets/icon10.png";
import icon11 from "../../assets/icon11.png";
import GeneratePDFButton from "../../components/GeneratePDFButton";

const DossierDetailShow = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [color, setColor] = useState(location.state?.color || "black");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  useEffect(() => {
    fetchPatient(id);
  }, [id]);

  const fetchPatient = async (patientId) => {
    try {
      setLoading(true);
      const response = await PatientService.getPatientById(patientId);
      setPatient(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching patient data:", err);
      setError("Failed to fetch patient data.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const handleDossierUpdate = () => {
    navigate(`/dossier/${patient.medicalDossier.id}`, {
      state: { patient, color },
    });
  };

  return (
    <div className="p-4 flex">
      <div className="w-full p-6">
        <div className="flex items-center mb-4">
          <div className="flex items-center w-full">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow p-2 border rounded-lg"
            />
            <button className="ml-2 p-2 bg-white border rounded-lg">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <button className="ml-4 p-2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
        <h2 className={`text-xl py-2 text-${color} font-bold`}>
          Mr. Patient &nbsp;
          <span className="text-gray-500">
            {patient.prenom} {patient.nom}
          </span>
          &nbsp;
          <span className="text-sm text-gray-500">
            Ref : {patient.referenceID}
          </span>
          <a
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleDossierUpdate}
            className={`inline-block ml-6 text-white px-4 py-2 whitespace-nowrap rounded-[0.27rem] ${
              isHovered
                ? "bg-yellow-500 cursor-pointer border-2 border-transparent"
                : "bg-[#8f8df2] cursor-pointer border-2 border-transparent animate-border"
            } text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700 dark:text-primary-500 transition-all duration-300 relative`}
            style={{ width: "350px" }}
          >
            {isHovered ? (
              <FontAwesomeIcon icon={faArrowAltCircleRight} className="mr-2" />
            ) : (
              <FontAwesomeIcon icon={faFolderOpen} className="mr-2" />
            )}
            {isHovered
              ? "Aller au mode mettre à jour le dossier"
              : "Vous êtes en mode consultation du dossier"}
            {!isHovered && (
              <span className="absolute top-0 left-0 w-full h-full border-2 border-transparent border-r-current border-b-current animate-border"></span>
            )}
          </a>
          <style jsx>{`
            @keyframes borderAnimation {
              0% {
                border-color: transparent;
              }
              25% {
                border-color: transparent;
              }
              50% {
                border-color: currentColor;
              }
              75% {
                border-color: transparent;
              }
              100% {
                border-color: transparent;
              }
            }
            .animate-border {
              animation: borderAnimation 2s infinite linear;
            }
          `}</style>
        </h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Link
            to={{
              pathname: `/show/patient-identity`,
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img src={icon1} alt="Identité" className="mr-2 w-8" /> Identité
          </Link>
          <Link
            to={{
              pathname: "/show/motif-hospitalisation",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img
              src={icon2}
              alt="Motif d’hospitalisation"
              className="mr-2 w-8"
            />{" "}
            Motif d’hospitalisation
          </Link>
          <Link
            to={{
              pathname: "/show/antecedents",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img src={icon3} alt="Antécédents" className="mr-2 w-8" />{" "}
            Antécédents
          </Link>
          <Link
            to={{
              pathname: "/show/histoire-maladie",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img
              src={icon4}
              alt="Histoire de la maladie"
              className="mr-2 w-8"
            />{" "}
            Histoire de la maladie
          </Link>
          <Link
            to={{
              pathname: "/show/conclusion-primaire",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img src={icon5} alt="Conclusion primaire" className="mr-2 w-8" />{" "}
            Conclusion primaire
          </Link>
          <Link
            to={{
              pathname: "/show/examen-clinique",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img src={icon6} alt="Examen clinique" className="mr-2 w-8" />{" "}
            Examen clinique
          </Link>
          <Link
            to={{
              pathname: "/show/ecg",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img src={icon7} alt="ECG" className="mr-2 w-8" /> ECG
          </Link>
          <Link
            to={{
              pathname: "/show/conclusion",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img src={icon8} alt="Conclusion" className="mr-2 w-8" /> Conclusion
          </Link>
          <Link
            to={{
              pathname: "/show/diagnostic",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img src={icon9} alt="Diagnostic" className="mr-2 w-8" /> Diagnostic
          </Link>
          <Link
            to={{
              pathname: "/show/exploration",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img src={icon10} alt="Exploration" className="mr-2 w-8" />{" "}
            Exploration
          </Link>
          <Link
            to={{
              pathname: "/show/biologie",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img src={icon11} alt="Biologie" className="mr-2 w-8" /> Biologie
          </Link>
          <GeneratePDFButton patient={patient} />
        </div>
      </div>
    </div>
  );
};

export default DossierDetailShow;
