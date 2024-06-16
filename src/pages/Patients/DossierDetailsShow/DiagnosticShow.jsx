import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import icon9 from "../../../assets/icon9.png";
import MedicalService from "../../../services/medical.service";
import HeaderDossierShow from "../../../components/HeaderDossierShow";

const DiagnosticShow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const [diagnosis, setDiagnosis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        setLoading(true);
        const response = await MedicalService.getAllDiagnosisByMedicalDossierId(
          patient.id
        );
        setDiagnosis(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDiagnosis();
  }, [patient.id]);

  const handlePrevious = () => {
    navigate("/show/conclusion", { state: { patient, color } });
  };

  const handleNext = () => {
    navigate("/show/exploration", { state: { patient, color } });
  };
  const handleDossierShow = () => {
    navigate(`/dossier/show/${patient.medicalDossier.id}`, {
      state: { patient, color },
    });
  };
  return (
    <div className="flex flex-col items-center p-10">
      <HeaderDossierShow handleDossierShow={handleDossierShow} />
      <div className={`mb-6 text-${color} font-bold`}>
        Mr Patient{" "}
        <span className="text-gray-500">
          {patient?.prenom} {patient?.nom}
        </span>
        , ref:<span className="text-gray-500"> {patient?.referenceID}</span>
      </div>
      <div className="bg-white border border-black rounded-3xl shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-black justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img src={icon9} alt="Identité" className="mr-2 align-center w-8" />
            Diagnostic
          </div>
        </div>
        {loading ? (
          <div className="pb-6 m-6">Chargement...</div>
        ) : error ? (
          <div className="pb-6 m-6">{error}</div>
        ) : (
          <div className="pb-6 m-6">
            {diagnosis.map((item, index) => (
              <div
                key={index}
                className="border border-gray-400 rounded-md p-4 mb-4"
              >
                <div>Diagnostic: {item.diagnosis}</div>
                <div>Diagnostic Différentiel: {item.diagnosisDifferentiel}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-between w-full max-w-md mt-6">
        <button
          onClick={handlePrevious}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-lg"
        >
          Précédent
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default DiagnosticShow;
