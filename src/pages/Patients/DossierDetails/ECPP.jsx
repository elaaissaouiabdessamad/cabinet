import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MedicalService from "../../../services/medical.service";
import icon6 from "../../../assets/icon6.png";
import HeaderDossierClinicalExam from "../../../components/HeaderDossierClinicalExam";

const ECPP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const [pulmonaryExamResult, setPulmonaryExamResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePulmonaryExamChange = (event) => {
    setPulmonaryExamResult(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await MedicalService.addClinicalExam(
        null,
        null,
        null,
        pulmonaryExamResult,
        null,
        patient.id
      );
      setLoading(false);
      toast.success(
        `Examen clinique : pleuro pulmonaire ${response.data.message}`
      );
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setLoading(false);
      toast.error(resMessage);
    }
  };

  const handleDossierClinicalExam = () => {
    navigate(`/examen-clinique`, {
      state: { patient, color },
    });
  };

  return (
    <div className="flex flex-col items-center p-10">
      <ToastContainer
        draggable
        closeOnClick
        position="bottom-right"
        autoClose={5000}
      />{" "}
      <HeaderDossierClinicalExam
        handleDossierClinicalExam={handleDossierClinicalExam}
      />
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
            Examen clinique &nbsp;
            <span className="text-sm"> / Pleuro pulmonaire</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 m-4">
            <textarea
              className="w-full h-32 p-2 border"
              required
              placeholder="Entrez le résultat de l'examen pulmonaire."
              value={pulmonaryExamResult}
              onChange={handlePulmonaryExamChange}
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded"
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

export default ECPP;
