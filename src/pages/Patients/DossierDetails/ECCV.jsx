import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MedicalService from "../../../services/medical.service";
import icon6 from "../../../assets/icon6.png";

const ECVV = () => {
  const location = useLocation();
  const patient = location.state?.patient;
  const color = location.state?.color;
  const [generalExam, setGeneralExam] = useState("");
  const [functionalSigns, setFunctionalSigns] = useState("");
  const [physicalSigns, setPhysicalSigns] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Call addClinicalExam method from MedicalService to send clinical exam data
      const response = await MedicalService.addClinicalExam(
        generalExam,
        functionalSigns,
        physicalSigns,
        null, // Assuming pulmonary and abdominal are not needed for cardiovascular exam
        null,
        patient.id
      );
      setLoading(false);
      setMessage(response.data.message);
      setSuccessful(true);
      // Handle success (e.g., redirect to another page)
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setLoading(false);
      setMessage(resMessage);
      setSuccessful(false);
    }
  };

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
      <div className={`mb-6 ${color}`}>
        Mr Patient {patient?.prenom} {patient?.nom}
      </div>
      <div className="bg-white border border-black rounded-3xl shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-black justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img src={icon6} alt="Identité" className="mr-2 align-center w-8" />
            Examen clinique &nbsp;
            <span className="text-sm"> / Cardio vasculaire</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <input
              type="text"
              placeholder="Examen général"
              className="w-full mb-6 p-4 border border-black"
              value={generalExam}
              onChange={(e) => setGeneralExam(e.target.value)}
            />
            <input
              type="text"
              placeholder="Signes fonctionnels"
              className="w-full mb-6 p-4 border border-black"
              value={functionalSigns}
              onChange={(e) => setFunctionalSigns(e.target.value)}
            />
            <input
              type="text"
              placeholder="Signes physiques"
              className="w-full mb-6 p-4 border border-black"
              value={physicalSigns}
              onChange={(e) => setPhysicalSigns(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {message && (
            <div className="text-sm text-center text-gray-700 dark:text-gray-200 mb-8 m-4">
              <div
                className={`${
                  successful ? "bg-green-500" : "bg-red-500"
                } text-white font-bold rounded-lg border border-white shadow-lg p-5 m-4`}
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ECVV;
