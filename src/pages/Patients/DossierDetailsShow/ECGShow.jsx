import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MedicalService from "../../../services/medical.service";
import icon7 from "../../../assets/icon7.png";
import HeaderDossierShow from "../../../components/HeaderDossierShow";
import AuthorizedImage from "../../../services/authorizedImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageModal from "../../../components/ImageModal";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const ECG = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const [modalImageSrc, setModalImageSrc] = useState(null);
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
  const handleImageClick = (imageSrc) => {
    setModalImageSrc(imageSrc);
  };

  const handleCloseModal = () => {
    setModalImageSrc(null);
  };

  return (
    <div className="flex flex-col items-center p-7">
      <HeaderDossierShow handleDossierShow={handleDossierShow} />
      <div className={`mb-6 text-${color} font-bold`}>
        Mr Patient{" "}
        <span className="text-gray-500">
          {patient?.prenom} {patient?.nom}
        </span>
        , ref:<span className="text-gray-500"> {patient?.referenceID}</span>
      </div>
      <div className="bg-white border border-black rounded-3xl shadow-lg w-full max-w-md">
        {" "}
        {/* Adjusted max-width here */}
        <div className="p-6 border-b border-black flex justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img src={icon7} alt="Identité" className="mr-2 align-center w-8" />
            ECG
          </div>
        </div>
        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p>{error}</p>
        ) : ecgs.length > 0 ? (
          <div className="p-6 m-4 grid grid-cols-1 md:grid-cols-1 gap-4">
            {ecgs.map((ecg, index) => (
              <div key={index} className="flex flex-col items-center">
                <AuthorizedImage
                  src={ecg.imageUrl}
                  alt="ECG Image"
                  className="h-64 w-auto"
                  onClick={handleImageClick}
                />
                <span className="mt-2">{ecg.conclusion}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mb-10 mt-10 text-gray-500 text-center">
            Aucune ECG disponible.
          </p>
        )}
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
      <ImageModal
        imageSrc={modalImageSrc}
        alt="Biology Image"
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ECG;
