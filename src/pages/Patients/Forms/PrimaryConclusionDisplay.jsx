import React, { useEffect, useState } from "react";
import MedicalService from "../../../services/medical.service";

const PrimaryConclusionDisplay = ({ patientId, primaryConclusionUpdate }) => {
  const [primaryConclusion, setPrimaryConclusion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrimaryConclusion = async () => {
      try {
        setLoading(true);
        const response = await MedicalService.getMedicalDossierByPatientId(
          patientId
        );
        const primaryConclusion = response.data.primaryConclusion;
        setPrimaryConclusion(primaryConclusion);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching primary conclusion:", error);
        setError("Failed to fetch primary conclusion.");
        setLoading(false);
      }
    };

    fetchPrimaryConclusion();
  }, [patientId, primaryConclusionUpdate]);

  return (
    <div className="m-5">
      {loading ? (
        <p>Chargement de la conclusion primaire...</p>
      ) : error ? (
        <p>Erreur : {error}</p>
      ) : primaryConclusion ? (
        <div className="p-4">
          <p>
            <strong>Conclusion primaire:</strong>
          </p>
          <p className="border border-gray-300 p-4 m-2">{primaryConclusion}</p>
        </div>
      ) : (
        <p className="text-gray-500">Aucune conclusion primaire disponible.</p>
      )}
    </div>
  );
};

export default PrimaryConclusionDisplay;
