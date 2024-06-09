import React from "react";
import { Link } from "react-router-dom";
import icon6 from "../../../assets/icon6.png";
import { useParams, useLocation } from "react-router-dom";
const ClinicalExamination = () => {
  const location = useLocation();
  const patient = location.state?.patient;
  const color = location.state?.color;
  console.log(patient);
  return (
    <div className="flex flex-col items-center p-10">
      <div className="flex items-center mb-6 w-full">
        <div className="flex items-center w-full relative">
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow p-2 border border-gray-400 rounded-lg pr-10"
          />
          <button className="absolute right-0 top-0 mr-2 p-2 rounded-lg">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <button className="p-2 ml-4 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      <div className={`mb-6 text-${color} font-bold`}>
        Mr Patient {patient?.prenom} {patient?.nom}
      </div>{" "}
      <div className="bg-white border border-black rounded-3xl shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-black justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img src={icon6} alt="Identité" className="mr-2 align-center w-8" />
            Examen clinique
          </div>
        </div>
        <div className="p-6">
          <Link
            to="/show/examen-clinique/cardio-vasculaire"
            state={{ patient, color }}
            className="no-underline"
          >
            <button className="bg-gradient-to-b from-[#97bfe4] to-[#3472ab] mt-5 mb-10 border border-black hover:shadow-lg hover:shadow-xl hover:shadow-2xl hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full">
              Cardio vasculaire
            </button>
          </Link>
          <Link
            to="/show/examen-clinique/pleuro-pulmonaire"
            state={{ patient, color }}
            className="no-underline"
          >
            <button className="bg-gradient-to-b from-[#97bfe4] to-[#3472ab] mb-10 border border-black hover:shadow-lg hover:shadow-xl hover:shadow-2xl hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full">
              Pleuro pulmonaire
            </button>
          </Link>
          <Link
            to="/show/examen-clinique/abdominal"
            state={{ patient, color }}
            className="no-underline"
          >
            <button className="bg-gradient-to-b from-[#97bfe4] to-[#3472ab] mb-10 border border-black hover:shadow-lg hover:shadow-xl hover:shadow-2xl hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full">
              Abdominal
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClinicalExamination;
