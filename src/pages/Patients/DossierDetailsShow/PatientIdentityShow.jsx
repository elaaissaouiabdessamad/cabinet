import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import icon1 from "../../../assets/icon1.png";
import HeaderDossierShow from "../../../components/HeaderDossierShow";

const PatientIdentity = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const handleNext = () => {
    navigate("/show/motif-hospitalisation", { state: { patient, color } });
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
        Mr Patient {patient?.prenom} {patient?.nom}
      </div>
      <div className="bg-white border border-black rounded-3xl shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-black justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img src={icon1} alt="Identité" className="mr-2 align-center w-8" />
            Identité
          </div>
        </div>
        <div className="p-6">
          <input
            type="text"
            placeholder="Nom"
            value={patient?.nom || ""}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Prénom"
            value={patient?.prenom || ""}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Age"
            value={patient?.age || ""}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Ville"
            value={patient?.ville || ""}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Profession"
            value={patient?.profession || ""}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Assurance"
            value={patient?.assurance || ""}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="ID"
            value={patient?.id || ""}
            className="w-full mb-2 p-2 border rounded-lg"
          />
        </div>
      </div>
      <div className="flex justify-end w-full max-w-md mt-6">
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

export default PatientIdentity;
