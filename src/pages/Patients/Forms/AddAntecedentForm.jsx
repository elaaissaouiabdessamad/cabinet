import React, { useState } from "react";
import MedicalService from "../../../services/medical.service";

const AddAntecedentForm = ({ patientId, setAntecedentUpdate }) => {
  const [personal, setPersonal] = useState("");
  const [familial, setFamilial] = useState("");
  const [cardiovascularRiskFactors, setCardiovascularRiskFactors] =
    useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await MedicalService.addAntecedent(
        personal,
        familial,
        cardiovascularRiskFactors,
        patientId
      );
      setPersonal("");
      setFamilial("");
      setCardiovascularRiskFactors("");
      setLoading(false);
      setMessage("Antecedents added successfully.");
      setAntecedentUpdate(Date.now()); // Update the state to trigger a re-fetch
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
          Personnels :
        </label>
        <input
          type="text"
          value={personal}
          onChange={(e) => setPersonal(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md block w-full shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Familiaux :
        </label>
        <input
          type="text"
          value={familial}
          onChange={(e) => setFamilial(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md block w-full shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Facteurs de risque cardio-vasculaire :
        </label>
        <input
          type="text"
          value={cardiovascularRiskFactors}
          onChange={(e) => setCardiovascularRiskFactors(e.target.value)}
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

export default AddAntecedentForm;
