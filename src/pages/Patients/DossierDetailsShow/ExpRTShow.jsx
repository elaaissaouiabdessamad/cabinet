import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MedicalService from "../../../services/medical.service";
import icon10 from "../../../assets/icon10.png";
import HeaderDossierExplorationShow from "../../../components/HeaderDossierExplorationShow";
import AuthorizedImage from "../../../services/authorizedImage";
import ImageModal from "../../../components/ImageModal";

const ExpRTShow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const [modalImageSrc, setModalImageSrc] = useState(null);
  const [explorations, setExplorations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExplorations = async () => {
      try {
        setLoading(true);
        const response = await MedicalService.getAllExpRTByMedicalDossierId(
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

  const handleImageClick = (imageSrc) => {
    setModalImageSrc(imageSrc);
  };

  const handleCloseModal = () => {
    setModalImageSrc(null);
  };

  return (
    <div className="flex flex-col items-center p-7">
      <HeaderDossierExplorationShow
        handleDossierExplorationShow={handleDossierExplorationShow}
      />
      <div className={`mb-6 text-${color} font-bold`}>
        Mr Patient{" "}
        <span className="text-gray-500">
          {patient?.prenom} {patient?.nom}
        </span>
        , ref:<span className="text-gray-500"> {patient?.referenceID}</span>
      </div>
      <div className="bg-white border border-black rounded-3xl shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-black flex justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img
              src={icon10}
              alt="Identité"
              className="mr-2 align-center w-8"
            />
            Exploration &nbsp;<span className="text-sm">/ Radio de thorax</span>
          </div>
        </div>
        {loading ? (
          <p className="p-6 justify-center">Chargement...</p>
        ) : error ? (
          <p>{error}</p>
        ) : explorations.length > 0 ? (
          <div className="p-6 m-4">
            {explorations.map((exploration, index) => (
              <div key={index} className="mb-4">
                <AuthorizedImage
                  src={exploration.imageUrl}
                  alt={`Exploration ${index + 1}`}
                  className="w-full"
                  onClick={handleImageClick}
                />
                <p className="mt-2">{exploration.conclusion}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mb-10 mt-10 text-gray-500 text-center">
            Aucune radio du thorax disponible.
          </p>
        )}
      </div>
      <ImageModal
        imageSrc={modalImageSrc}
        alt="Biology Image"
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ExpRTShow;
