import React, { useState, useEffect } from "react";
import MedicalService from "../../../services/medical.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddPrimaryConclusionForm = ({
  patientId,
  setPrimaryConclusionUpdate,
}) => {
  const [primaryConclusion, setPrimaryConclusion] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const fetchPrimaryConclusion = async () => {
      try {
        setLoading(true);
        const response = await MedicalService.getMedicalDossierByPatientId(
          patientId
        );
        const fetchedPrimaryConclusion = response.data.primaryConclusion;
        setPrimaryConclusion(fetchedPrimaryConclusion);
        if (fetchedPrimaryConclusion === "" || !fetchedPrimaryConclusion) {
          setIsNew(true);
        }
        setLoading(false);
      } catch (error) {
        console.error(
          "Échec de la récupération de la conclusion principale.:",
          error
        );
        setLoading(false);
      }
    };

    fetchPrimaryConclusion();
  }, [patientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await MedicalService.patchMedicalDossier(
        null,
        null,
        primaryConclusion,
        null,
        patientId
      );
      setPrimaryConclusionUpdate(primaryConclusion);
      setIsNew(false);
      setLoading(false);
      toast.success(`Conclusion primaire ${response.data.message}`);
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
          htmlFor="primaryConclusion"
          className="block text-sm font-medium text-gray-700"
        >
          {isNew
            ? "Ajouter conclusion primaire:"
            : "Modifier conclusion primaire (déjà enregistré):"}
        </label>
        <textarea
          id="primaryConclusion"
          value={primaryConclusion}
          onChange={(e) => setPrimaryConclusion(e.target.value)}
          required
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

export default AddPrimaryConclusionForm;
