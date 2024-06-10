import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MedicalService from "../../../services/medical.service";
import icon7 from "../../../assets/icon7.png";
import iconFolder from "../../../assets/iconFolder.png";
import HeaderDossierShow from "../../../components/HeaderDossierShow";

const ECG = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const [ecgs, setEcgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEcgs = async () => {
      try {
        setLoading(true);
        const response = await MedicalService.getAllEcgsByMedicalDossierId(
          patient.id
        );
        setEcgs(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEcgs();
  }, [patient.id]);

  const handlePrevious = () => {
    navigate("/show/examen-clinique", { state: { patient, color } });
  };

  const handleNext = () => {
    navigate("/show/conclusion", { state: { patient, color } });
  };
  const handleDossierShow = () => {
    navigate(`/dossier/show/${patient.medicalDossier.id}`, {
      state: { patient, color },
    });
  };

  return (
    <div className="flex flex-col items-center p-10 max-h-width">
      <HeaderDossierShow handleDossierShow={handleDossierShow} />

      <div className={`mb-6 text-${color} font-bold`}>
        Mr Patient {patient?.prenom} {patient?.nom}
      </div>
      <div className="bg-white border border-black rounded-3xl shadow-lg w-full max-w-3xl">
        {" "}
        {/* Adjusted max-width here */}
        <div className="p-6 border-b border-black flex justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img src={icon7} alt="Identité" className="mr-2 align-center w-8" />
            ECG
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="p-6 m-4 grid grid-cols-1 md:grid-cols-1 gap-4">
            {ecgs.map((ecg, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={ecg.imageUrl}
                  alt="ECG Image"
                  className="h-64 w-auto"
                />
                <span className="mt-2">{ecg.conclusion}</span>
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

export default ECG;
