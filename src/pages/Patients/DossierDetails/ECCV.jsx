import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MedicalService from "../../../services/medical.service";
import icon6 from "../../../assets/icon6.png";
import HeaderDossierClinicalExam from "../../../components/HeaderDossierClinicalExam";

const ECVV = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
      const response = await MedicalService.addClinicalExam(
        generalExam,
        functionalSigns,
        physicalSigns,
        null,
        null,
        patient.id
      );
      setLoading(false);
      setMessage(response.data.message);
      setSuccessful(true);
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

  const handleDossierClinicalExam = () => {
    navigate(`/examen-clinique`, {
      state: { patient, color },
    });
  };

  return (
    <div className="flex flex-col items-center p-10">
      <HeaderDossierClinicalExam
        handleDossierClinicalExam={handleDossierClinicalExam}
      />
      <div className={`mb-6 text-${color} font-bold`}>
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
            <textarea
              type="text"
              placeholder="Examen général"
              className="w-full mb-6 p-4 border border-black"
              value={generalExam}
              onChange={(e) => setGeneralExam(e.target.value)}
            ></textarea>
            <textarea
              type="text"
              placeholder="Signes fonctionnels"
              className="w-full mb-6 p-4 border border-black"
              value={functionalSigns}
              onChange={(e) => setFunctionalSigns(e.target.value)}
            ></textarea>
            <textarea
              type="text"
              placeholder="Signes physiques"
              className="w-full p-4 border border-black"
              value={physicalSigns}
              onChange={(e) => setPhysicalSigns(e.target.value)}
            ></textarea>
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
              disabled={loading}
            >
              {loading ? "Soumission en cours..." : "Soumettre"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ECVV;
