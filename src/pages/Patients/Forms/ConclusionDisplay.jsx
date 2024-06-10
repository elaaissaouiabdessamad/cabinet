import React, { useEffect, useState } from "react";
import MedicalService from "../../../services/medical.service";

const ConclusionDisplay = ({ patientId, conclusionUpdate }) => {
  const [conclusion, setConclusion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConclusion = async () => {
      try {
        setLoading(true);
        const response = await MedicalService.getMedicalDossierByPatientId(
          patientId
        );
        const conclusion = response.data.conclusion;
        setConclusion(conclusion);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching conclusion:", error);
        setError("Failed to fetch conclusion.");
        setLoading(false);
      }
    };

    fetchConclusion();
  }, [patientId, conclusionUpdate]); // Include conclusionUpdate in dependency array

  return (
    <div className="m-2">
      {loading ? (
        <p>Chargement de la conclusion...</p>
      ) : error ? (
        <p>Erreur : {error}</p>
      ) : conclusion ? (
        <div className="p-2">
          <textarea
            readOnly
            className="border border-gray-300 p-2 rounded-lg w-full"
            rows={8}
            value={conclusion}
          />
        </div>
      ) : (
        <p className="mt-10 text-gray-500 text-center">
          Aucune conclusion disponible.
        </p>
      )}
    </div>
  );
};

export default ConclusionDisplay;
