import React, { useState, useEffect } from "react";
import MedicalService from "../../../services/medical.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddReasonHospitalizationForm = ({ patientId, setReasonUpdate }) => {
  const [reason, setReason] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchReason = async () => {
      try {
        setLoading(true);
        const response = await MedicalService.getMedicalDossierByPatientId(
          patientId
        );
        const reasonForHospitalization = response.data.hospitalization;
        setReason(reasonForHospitalization);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error(
          "Échec de la récupération de la raison de l'hospitalisation:",
          error
        );
        setError("Échec de la récupération de la raison de l'hospitalisation.");
        setLoading(false);
      }
    };

    fetchReason();
  }, [patientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await MedicalService.patchMedicalDossier(
        reason,
        null,
        null,
        null,
        patientId
      );
      setReasonUpdate(reason);
      setLoading(false);
      toast.success(`Motif d'hospitalisation ${response.data.message}`);
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

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <ToastContainer
        draggable
        closeOnClick
        position="bottom-right"
        autoClose={5000}
      />
      <div className="mb-4">
        <label
          htmlFor="reason"
          className="block text-sm font-medium text-gray-700"
        >
          Modifier motif d'hospitalisation:
        </label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm"
          rows="4"
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
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded"
        >
          {loading ? "Chargement..." : "Soumettre"}
        </button>
      </div>
    </form>
  );
};

export default AddReasonHospitalizationForm;
