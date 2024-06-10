import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MedicalService from "../../../services/medical.service";
import icon10 from "../../../assets/icon10.png";
import HeaderDossierExplorationShow from "../../../components/HeaderDossierExplorationShow";

const ExpEchoShow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const [explorations, setExplorations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExplorations = async () => {
      try {
        setLoading(true);
        const response = await MedicalService.getAllExpEchoByMedicalDossierId(
          patient.id
        );
        setExplorations(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchExplorations();
  }, [patient.id]);

  const handleDossierExplorationShow = () => {
    navigate(`/show/exploration`, {
      state: { patient, color },
    });
  };

  return (
    <div className="flex flex-col items-center p-10">
      <HeaderDossierExplorationShow
        handleDossierExplorationShow={handleDossierExplorationShow}
      />
      <div className={`mb-6 text-${color} font-bold`}>
        Mr Patient {patient?.prenom} {patient?.nom}
      </div>
      <div className="bg-white border border-black rounded-3xl shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-black flex justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img
              src={icon10}
              alt="Identité"
              className="mr-2 align-center w-8"
            />
            Exploration &nbsp;
            <span className="text-sm">/ Echocardiographie</span>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="p-6 m-4">
            {explorations.map((exploration, index) => (
              <div key={index} className="mb-4">
                <img
                  src={exploration.imageUrl}
                  alt={`Echo ${index + 1}`}
                  className="w-full"
                />
                <p className="mt-2">{exploration.conclusion}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpEchoShow;
