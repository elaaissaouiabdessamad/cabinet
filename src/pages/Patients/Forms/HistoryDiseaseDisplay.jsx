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
        <p>Erreur : {error}</p>
      ) : historyDisease ? (
        <div className="p-4">
          <p>
            <strong>Histoire de la maladie :</strong>
          </p>
          <p className="border border-gray-300 p-4 m-2">{historyDisease}</p>
        </div>
      ) : (
        <p className="text-gray-500">
          Aucune histoire de la maladie disponible.
        </p>
      )}
    </div>
  );
};

export default HistoryDiseaseDisplay;
