import React, { useState } from "react";
import MedicalService from "../../../services/medical.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddAntecedentForm = ({ patientId, setAntecedentUpdate }) => {
  const [personal, setPersonal] = useState("");
  const [familial, setFamilial] = useState("");
  const [cardiovascularRiskFactors, setCardiovascularRiskFactors] =
    useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await MedicalService.addAntecedent(
        personal,
        familial,
        cardiovascularRiskFactors,
        patientId
      );
      setLoading(false);
      toast.success("Antécédents ajoutés avec succès.");
      setAntecedentUpdate(Date.now());
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
          Personnels :
        </label>
        <textarea
          type="text"
          value={personal}
          onChange={(e) => setPersonal(e.target.value)}
          required
          placeholder="Personnels"
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
          placeholder="Familiaux"
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
          placeholder="Facteurs de risque cardio-vasculaire"
          className="mt-1 p-2 border border-gray-300 rounded-md block w-full shadow-sm"
        ></textarea>
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
