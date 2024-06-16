import React, { useState } from "react";
import MedicalService from "../../../services/medical.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddDiagnosticForm = ({ patientId }) => {
  const [diagnosis, setDiagnosis] = useState("");
  const [diagnosisDifferentiel, setDiagnosisDifferentiel] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await MedicalService.addDiagnosis(
        diagnosis,
        diagnosisDifferentiel,
        patientId
      );
      setDiagnosis("");
      setDiagnosisDifferentiel("");
      setLoading(false);
      toast.success("Diagnostics ajoutés avec succès.");
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <ToastContainer
        draggable
        closeOnClick
        position="bottom-right"
        autoClose={5000}
      />{" "}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Diagnostic:
        </label>
        <textarea
          type="text"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md block w-full shadow-sm"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Diagnostic différentiel:
        </label>
        <textarea
          type="text"
          value={diagnosisDifferentiel}
          onChange={(e) => setDiagnosisDifferentiel(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md block w-full shadow-sm"
        ></textarea>
        {message && (
          <div className="text-sm text-center text-gray-700 mb-2 mt-6">
            <div
              className="bg-green-500 text-white font-bold rounded-lg p-5"
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

export default AddDiagnosticForm;
