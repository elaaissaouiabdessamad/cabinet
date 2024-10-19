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
        <p className="text-red-500">Erreur : {error}</p>
      ) : primaryConclusion ? (
        <textarea
          readOnly
          className="border border-gray-300 p-2 rounded-lg w-full"
          rows={8}
          value={primaryConclusion}
        />
      ) : (
        <p className="mt-10 text-gray-500 text-center">
          Aucune conclusion primaire disponible.
        </p>
      )}
    </div>
  );
};

export default PrimaryConclusionDisplay;
