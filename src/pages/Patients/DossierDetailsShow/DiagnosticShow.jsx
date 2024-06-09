import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import icon9 from "../../../assets/icon9.png";
import MedicalService from "../../../services/medical.service";

const DiagnosticShow = () => {
  const location = useLocation();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const [diagnosis, setDiagnosis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        setLoading(true);
        const response = await MedicalService.getAllDiagnosisByMedicalDossierId(
          patient.id
        );
        setDiagnosis(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDiagnosis();
  }, [patient.id]);

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
      </div>
      <div className="bg-white border border-black rounded-3xl shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-black justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img src={icon9} alt="Identité" className="mr-2 align-center w-8" />
            Diagnostic
          </div>
        </div>
        {loading ? (
          <div className="p-6 mt-7">Loading...</div>
        ) : error ? (
          <div className="p-6 mt-7">{error}</div>
        ) : (
          <div className="p-6 mt-7">
            {diagnosis.map((item, index) => (
              <div
                key={index}
                className="border border-gray-400 rounded-md p-4 mb-4"
              >
                <div>Diagnosis: {item.diagnosis}</div>
                <div>Differential Diagnosis: {item.diagnosisDifferentiel}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosticShow;
