import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MedicalService from "../../../services/medical.service";
import icon11 from "../../../assets/icon11.png";
import iconFolder from "../../../assets/iconFolder.png";

const Biology = () => {
  const location = useLocation();
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
      setDownloading(false); // Reset downloading state
    }
  };

  return (
    <div className="flex flex-col items-center p-10">
      <div className="flex items-center w-full">
        <div className="flex items-center mb-3 w-full">
          <div className="flex items-center w-full relative">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow p-2 border border-gray-400 rounded-lg pr-10"
            />
            <button className="absolute right-0 top-0 mr-2 p-2 rounded-lg">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <button className="p-2 ml-4 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>{" "}
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
            Biology
          </div>
        </div>
        {loading || downloading ? (
          <p>Loading...</p>
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
                      View
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
    </div>
  );
};

export default Biology;
