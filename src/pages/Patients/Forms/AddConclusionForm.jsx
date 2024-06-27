import React, { useState, useEffect } from "react";
import MedicalService from "../../../services/medical.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddConclusionForm = ({ patientId, setConclusionUpdate }) => {
  const [conclusion, setConclusion] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(false);
  useEffect(() => {
    const fetchConclusion = async () => {
      try {
        setLoading(true);
        const response = await MedicalService.getMedicalDossierByPatientId(
          patientId
        );
        const fetchedConclusion = response.data.conclusion;
        setConclusion(fetchedConclusion);
        if (fetchedConclusion === "" || !fetchedConclusion) {
          setIsNew(true);
        }
        setLoading(false);
      } catch (error) {
        console.error("Échec de la récupération de la conclusion.", error);
        setLoading(false);
      }
    };

    fetchConclusion();
  }, [patientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await MedicalService.patchMedicalDossier(
        null,
        null,
        null,
        conclusion,
        patientId
      );
      setConclusionUpdate(conclusion);
      setIsNew(false);
      setLoading(false);
      toast.success(`Conclusion ${response.data.message}`);
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
          htmlFor="conclusion"
          className="block text-sm font-medium text-gray-700"
        >
          {isNew
            ? "Ajouter conclusion:"
            : "Modifier conclusion (déjà enregistré):"}
        </label>
        <textarea
          id="conclusion"
          value={conclusion}
          onChange={(e) => setConclusion(e.target.value)}
          required
          placeholder="Entrez la conclusion"
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

export default AddConclusionForm;
