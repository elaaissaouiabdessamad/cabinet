import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MedicalService from "../../../services/medical.service";
import icon11 from "../../../assets/icon11.png";
import iconFolder from "../../../assets/iconFolder.png";
import HeaderDossierShow from "../../../components/HeaderDossierShow";
import AuthorizedImage from "../../../services/authorizedImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Biology = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const [biologies, setBiologies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchBiologies = async () => {
      try {
        setLoading(true);
        const response = await MedicalService.getAllBiologiesByMedicalDossierId(
          patient.id
        );
        setBiologies(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBiologies();
  }, [patient.id]);

  const handlePrevious = () => {
    navigate("/show/exploration", { state: { patient, color } });
  };

  const handleDossierShow = () => {
    navigate(`/dossier/show/${patient.medicalDossier.id}`, {
      state: { patient, color },
    });
  };

  const handleDossierEdit = () => {
    navigate(`/dossier/${patient.medicalDossier.id}`, {
      state: { patient, color },
    });
  };

  const downloadFile = async (fileUrl, isPDF) => {
    try {
      if (isPDF) {
        window.open(fileUrl, "_blank");
      } else {
        setDownloading(true);
        const response = await fetch(fileUrl);
        if (!response.ok) {
          throw new Error(
            `Erreur lors du téléchargement du fichier: ${response.status} ${response.statusText}`
          );
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "file";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        setDownloading(false);
      }
      setError(null);
    } catch (error) {
      console.error("Erreur lors du téléchargement du fichier: ", error);
      setError(
        "Échec du téléchargement du fichier. Veuillez réessayer ultérieurement."
      );
      setDownloading(false);
    }
  };

  const previewPDF = (fileUrl) => {
    console.log(fileUrl);
    window.open(`/preview-pdf?url=${encodeURIComponent(fileUrl)}`, "_blank");
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
        <div className="p-6 border-b border-black flex justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img
              src={icon11}
              alt="Identité"
              className="mr-2 align-center w-8"
            />
            Biologie
          </div>
        </div>
        {loading || downloading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p>{error}</p>
        ) : biologies.length > 0 ? (
          <div className="p-6 m-4">
            {biologies.map((biology, index) => {
              const fileExtension = biology.bilanImageUrl
                .split(".")
                .pop()
                .toLowerCase();
              const isPDF = fileExtension === "pdf";
              return (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-300 pb-4 mb-4"
                >
                  <div className="flex items-center">
                    <img src={iconFolder} alt="Folder" className="h-14 w-14" />
                    <span className="ml-4">{biology.conclusion}</span>
                  </div>
                  {isPDF ? (
                    <div>
                      <button
                        className="text-blue-500 hover:underline mr-2"
                        onClick={() =>
                          downloadFile(biology.bilanImageUrl, true)
                        }
                      >
                        Télécharger
                      </button>
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => previewPDF(biology.bilanImageUrl)}
                      >
                        Prévisualiser
                      </button>
                    </div>
                  ) : (
                    <AuthorizedImage
                      src={biology.bilanImageUrl}
                      alt={biology.conclusion}
                      className="h-14 w-14"
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mb-10 mt-10 text-gray-500 text-center">
            Aucune biologie disponible.
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
          onClick={handleDossierEdit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          <FontAwesomeIcon icon={faEye} className="ml-1" />
          &nbsp; Éditer dossier du patient
        </button>
      </div>
    </div>
  );
};

export default Biology;
