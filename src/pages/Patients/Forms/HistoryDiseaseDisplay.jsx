import React, { useEffect, useState } from "react";
import MedicalService from "../../../services/medical.service";

const HistoryDiseaseDisplay = ({ patientId, historyDiseaseUpdate }) => {
  const [historyDisease, setHistoryDisease] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistoryDisease = async () => {
      try {
        setLoading(true);
        const response = await MedicalService.getMedicalDossierByPatientId(
          patientId
        );
        const historyDisease = response.data.historyDisease;
        setHistoryDisease(historyDisease);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching history disease:", error);
        setError("Failed to fetch history disease.");
        setLoading(false);
      }
    };

    fetchHistoryDisease();
  }, [patientId, historyDiseaseUpdate]);

  return (
    <div className="m-5">
      {loading ? (
        <p>Chargement de l'histoire de la maladie...</p>
      ) : error ? (
        <p className="text-red-500">Erreur : {error}</p>
      ) : historyDisease ? (
        <textarea
          readOnly
          className="border border-gray-300 p-2 rounded-lg w-full"
          rows={8}
          value={historyDisease}
        />
      ) : (
        <p className="mt-10 text-gray-500 text-center">
          Aucune histoire de la maladie disponible.
        </p>
      )}
    </div>
  );
};

export default HistoryDiseaseDisplay;
