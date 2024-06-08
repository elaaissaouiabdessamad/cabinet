import React, { useState } from "react";
import MedicalService from "../../../services/medical.service";

const AddConclusionForm = ({ patientId, setConclusionUpdate }) => {
  const [conclusion, setConclusion] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Patch the medical dossier with the reason for hospitalization
      const response = await MedicalService.patchMedicalDossier(
        null,
        null,
        null,
        conclusion,
        patientId
      );
      // Reset form state
      setConclusion("");
      setConclusionUpdate(conclusion);
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
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="mb-4">
        <label
          htmlFor="conclusion"
          className="block text-sm font-medium text-gray-700"
        >
          Modifier conclusion :
        </label>
        <textarea
          id="conclusion"
          value={conclusion}
          onChange={(e) => setConclusion(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm"
          rows="4" // Set the number of rows
        ></textarea>
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
      )}{" "}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {loading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default AddConclusionForm;
