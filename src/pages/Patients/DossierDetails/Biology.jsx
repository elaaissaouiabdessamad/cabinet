import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MedicalService from "../../../services/medical.service";
import icon11 from "../../../assets/icon11.png";
import iconFolder from "../../../assets/iconFolder.png";
import HeaderDossier from "../../../components/HeaderDossier";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Biology = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const [bilanFile, setBilanFile] = useState(null);
  const [conclusion, setConclusion] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("bilanFile", bilanFile);
      formData.append("conclusion", conclusion);
      const response = await MedicalService.addBiology(formData, patient.id);
      setLoading(false);
      setBilanFile(null);
      setConclusion("");
      fileInputRef.current.value = "";
      toast.success(response.data.message);
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setLoading(false);
      toast.error(resMessage);
    }
  };

  const handleFileChange = (e) => {
    setBilanFile(e.target.files[0]);
  };

  const handleConclusionChange = (e) => {
    setConclusion(e.target.value);
  };

  {
    /*const handleClear = () => {
    setBilanFile(null);
    setConclusion("");
    fileInputRef.current.value = "";
  };*/
  }

  const handlePrevious = () => {
    navigate("/exploration", { state: { patient, color } });
  };

  const handleDossier = () => {
    navigate(`/dossier/${patient.medicalDossier.id}`, {
      state: { patient, color },
    });
  };

  const handleDossierRead = () => {
    navigate(`/dossier/show/${patient.medicalDossier.id}`, {
      state: { patient, color },
    });
  };

  return (
    <div className="flex flex-col items-center p-7">
      <ToastContainer
        draggable
        closeOnClick
        position="bottom-right"
        autoClose={5000}
      />
      <HeaderDossier handleDossier={handleDossier} />
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
        <form onSubmit={handleSubmit}>
          <div className="p-6 m-4 flex justify-between items-center">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <img src={iconFolder} alt="Folder Icon" className="h-14 w-14" />
          </div>
          <div className="p-6 m-4">
            <textarea
              className="w-full h-32 p-2 border"
              placeholder="Conclusion"
              value={conclusion}
              onChange={handleConclusionChange}
            ></textarea>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded"
                disabled={loading}
              >
                {loading ? "Envoi en cours..." : "Envoyer la biologie"}
              </button>
              {/*<button
                type="button"
                onClick={handleClear}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-4 rounded"
                disabled={loading}
              >
                Vider
              </button>*/}
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-between w-full max-w-md mt-6">
        <button
          onClick={handlePrevious}
          className="bg-white hover:bg-blue-200 border-white hover:border-blue-200 border text-blue-500 font-bold py-2 px-4 rounded-lg"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Précédent
        </button>
        <button
          onClick={handleDossierRead}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          {" "}
          <FontAwesomeIcon icon={faEdit} className="ml-1" />
          &nbsp; Consulter dossier du patient
        </button>
      </div>
    </div>
  );
};

export default Biology;
