import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MedicalService from "../../../services/medical.service";
import icon11 from "../../../assets/icon11.png";
import iconFolder from "../../../assets/iconFolder.png";
import HeaderDossierShow from "../../../components/HeaderDossierShow";

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

  const downloadFile = async (fileUrl) => {
    try {
      setDownloading(true);
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to download file: ${response.status} ${response.statusText}`
        );
      }
      const fileExtension = fileUrl.split(".").pop().toLowerCase();
      const isPDF = fileExtension === "pdf";

      if (isPDF) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "file.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
      setError(null); // Reset error state after successful download
    } catch (error) {
      console.error("Error downloading file:", error);
      setError("Failed to download file. Please try again later.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-10">
      <HeaderDossierShow handleDossierShow={handleDossierShow} />
      <div className={`mb-6 text-${color} font-bold`}>
        Mr Patient {patient?.prenom} {patient?.nom}
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
        ) : (
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
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => downloadFile(biology.bilanImageUrl)}
                    >
                      Consulter
                    </button>
                  ) : (
                    <img
                      src={biology.bilanImageUrl}
                      alt={biology.conclusion}
                      className="h-14 w-14"
                    />
                  )}
                </div>
              );
            })}
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
          onClick={handleDossierEdit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Éditer dossier du patient {patient?.referenceID}
        </button>
      </div>
    </div>
  );
};

export default Biology;
