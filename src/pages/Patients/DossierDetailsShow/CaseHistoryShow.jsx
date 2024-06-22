import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import icon3 from "../../../assets/icon3.png";
import MedicalService from "../../../services/medical.service";
import HeaderDossierShow from "../../../components/HeaderDossierShow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CaseHistoryShow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const [antecedents, setAntecedents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAntecedents = async () => {
      try {
        setLoading(true);
        const response =
          await MedicalService.getAllAntecedentsByMedicalDossierId(patient.id);
        setAntecedents(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAntecedents();
  }, [patient.id]);

  const handlePrevious = () => {
    navigate("/show/motif-hospitalisation", { state: { patient, color } });
  };

  const handleNext = () => {
    navigate("/show/histoire-maladie", { state: { patient, color } });
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
            <img src={icon3} alt="Identité" className="mr-2 align-center w-8" />
            Antécédents
          </div>
        </div>
        <div className="p-6">
          {loading && <p className="text-center">Chargement...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && (
            <div>
              {antecedents.map((antecedent, index) => (
                <div
                  key={index}
                  className="mb-4 border border-gray-200 p-4 rounded-lg"
                >
                  <h3 className="mb-2">
                    <strong>Personnel: </strong>
                    {antecedent.personal}
                  </h3>
                  <p className="mb-2">
                    <strong>Relatif à la famille: </strong>{" "}
                    {antecedent.familial}
                  </p>
                  <p>
                    <strong>Facteurs de Risque Cardiovasculaire:</strong>{" "}
                    {antecedent.cardiovascularRiskFactors}
                  </p>
                </div>
              ))}
              {antecedents.length === 0 && (
                <p className="pb-2 m-6 text-gray-500 text-center">
                  Aucun antécédent disponible.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between w-full max-w-md mt-6">
        <button
          onClick={handlePrevious}
          className="bg-white hover:bg-blue-200 border-white hover:border-blue-200 border text-blue-500 font-bold py-2 px-4 rounded-lg"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Précédent
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Suivant <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default CaseHistoryShow;
