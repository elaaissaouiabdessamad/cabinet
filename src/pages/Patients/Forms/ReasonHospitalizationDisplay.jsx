import React, { useEffect, useState } from "react";
import MedicalService from "../../../services/medical.service";

const ReasonHospitalizationDisplay = ({ patientId, reasonUpdate }) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReason = async () => {
      try {
        setLoading(true);
        const response = await MedicalService.getMedicalDossierByPatientId(
          patientId
        );
        const reasonForHospitalization = response.data.hospitalization;
        setReason(reasonForHospitalization);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching reason for hospitalization:", error);
        setError("Failed to fetch reason for hospitalization.");
        setLoading(false);
      }
    };

    fetchReason();
  }, [patientId, reasonUpdate]);

  return (
    <div className="m-5">
      {loading ? (
        <p>Chargement du motif d'hospitalisation...</p>
      ) : error ? (
        <p className="text-red-500">Erreur : {error}</p>
      ) : reason ? (
        <textarea
          readOnly
          className="border border-gray-300 p-2 rounded-lg w-full"
          rows={8}
          value={reason}
        />
      ) : (
        <p className="mt-10 text-gray-500 text-center">
          Aucun motif d'hospitalisation trouvé.
        </p>
      )}
    </div>
  );
};

export default ReasonHospitalizationDisplay;
