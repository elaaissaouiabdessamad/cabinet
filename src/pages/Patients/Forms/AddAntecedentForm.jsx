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
        <textarea
          type="text"
          value={personal}
          onChange={(e) => setPersonal(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md block w-full shadow-sm"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Familiaux :
        </label>
        <textarea
          type="text"
          value={familial}
          onChange={(e) => setFamilial(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md block w-full shadow-sm"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Facteurs de risque cardio-vasculaire :
        </label>
        <textarea
          type="text"
          value={cardiovascularRiskFactors}
          onChange={(e) => setCardiovascularRiskFactors(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md block w-full shadow-sm"
        ></textarea>
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded"
        >
          {loading ? "Chargement..." : "Soumettre"}
        </button>
      </div>
    </form>
  );
};

export default AddAntecedentForm;
