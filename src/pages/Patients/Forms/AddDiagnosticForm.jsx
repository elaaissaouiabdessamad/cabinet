import React, { useState } from "react";
import MedicalService from "../../../services/medical.service";

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
      setMessage("Diagnostic added successfully.");
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setLoading(false);
      setMessage(resMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Diagnostic:
        </label>
        <input
          type="text"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md block w-full shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Diagnostic différentiel:
        </label>
        <input
          type="text"
          value={diagnosisDifferentiel}
          onChange={(e) => setDiagnosisDifferentiel(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md block w-full shadow-sm"
        />
      </div>
      {message && (
        <div className="text-sm text-center text-gray-700 mb-8">
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
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {loading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default AddDiagnosticForm;
