import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MedicalService from "../../../services/medical.service";
import icon10 from "../../../assets/icon10.png";
import iconFolder from "../../../assets/iconFolder.png";
import HeaderDossierExploration from "../../../components/HeaderDossierExploration";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ExpRT = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const [imageFile, setImageFile] = useState(null);
  const [conclusion, setConclusion] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("imageFile", imageFile);
      formData.append("conclusion", conclusion);
      formData.append("explorationType", "RADIO_THORAX");
      const response = await MedicalService.addExploration(
        formData,
        patient.id
      );
      setLoading(false);
      toast.success(`Exploration : Radio de thorax ${response.data.message}`);
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

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleConclusionChange = (e) => {
    setConclusion(e.target.value);
  };

  const handleDossierExploration = () => {
    navigate(`/exploration`, {
      state: { patient, color },
    });
  };

  return (
    <div className="flex flex-col items-center p-10">
      <ToastContainer
        draggable
        closeOnClick
        position="bottom-right"
        autoClose={5000}
      />{" "}
      <HeaderDossierExploration
        handleDossierExploration={handleDossierExploration}
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
        <form onSubmit={handleSubmit}>
          <div className="p-6 m-4 flex justify-between items-center">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <img src={iconFolder} alt="icone dossier" className="h-14 w-14" />
          </div>
          <div className="p-6 m-4">
            <textarea
              className="w-full h-32 p-2 border"
              placeholder="Conclusion"
              value={conclusion}
              onChange={handleConclusionChange}
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded"
              disabled={loading}
            >
              {loading ? "Envoi en cours..." : "Envoyer l'exploration"}{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpRT;
