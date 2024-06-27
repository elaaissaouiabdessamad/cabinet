import React, { useState, useEffect } from "react";
import MedicalService from "../../../services/medical.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddHistoryDiseaseForm = ({ patientId, setHistoryDiseaseUpdate }) => {
  const [historyDisease, setHistoryDisease] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const fetchHistoryDisease = async () => {
      try {
        setLoading(true);
        const response = await MedicalService.getMedicalDossierByPatientId(
          patientId
        );
        const fetchedHistoryDisease = response.data.historyDisease;
        setHistoryDisease(fetchedHistoryDisease);
        if (fetchedHistoryDisease === "" || !fetchedHistoryDisease) {
          setIsNew(true);
        }
        setLoading(false);
      } catch (error) {
        console.error(
          "Échec de la récupération de l'historique des maladies.:",
          error
        );
        setLoading(false);
      }
    };

    fetchHistoryDisease();
  }, [patientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await MedicalService.patchMedicalDossier(
        null,
        historyDisease,
        null,
        null,
        patientId
      );
      setHistoryDiseaseUpdate(historyDisease);
      setIsNew(false);
      setLoading(false);
      toast.success(`Histoire de la maladie ${response.data.message}`);
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
      />{" "}
      <div className="mb-4">
        <label
          htmlFor="historyDisease"
          className="block text-sm font-medium text-gray-700"
        >
          {isNew
            ? "Ajouter l'histoire de la maladie:"
            : "Modifier l'histoire de la maladie (déjà enregistré):"}
        </label>
        <textarea
          id="historyDisease"
          value={historyDisease}
          onChange={(e) => setHistoryDisease(e.target.value)}
          required
          placeholder="Entrez l'histoire de la maladie"
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm"
          rows="4"
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

export default AddHistoryDiseaseForm;
