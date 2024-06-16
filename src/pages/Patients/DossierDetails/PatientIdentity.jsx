import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PatientService from "../../../services/patient.service";
import icon1 from "../../../assets/icon1.png";
import HeaderDossier from "../../../components/HeaderDossier";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientIdentity = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(location.state?.patient);
  const color = location.state?.color;

  const [formData, setFormData] = useState({
    nom: patient?.nom || "",
    prenom: patient?.prenom || "",
    age: patient?.age || "",
    ville: patient?.ville || "",
    profession: patient?.profession || "",
    assurance: patient?.assurance || "",
    referenceID: patient?.referenceID || "",
    id: patient?.id || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedPatientData = await PatientService.updatePatient(
        patient.id,
        formData
      );
      const updatedPatient = {
        ...patient,
        ...updatedPatientData.data,
        bedAssignmentHistories: patient.bedAssignmentHistories,
        medicalDossier: patient.medicalDossier,
      };
      setPatient(updatedPatient); // Synchroniser le patient mis à jour
      toast.success("Patient mis à jour avec succès !");
    } catch (err) {
      toast.error("Échec de la mise à jour des détails du patient !");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    navigate("/motif-hospitalisation", { state: { patient, color } });
  };

  const handleDossier = () => {
    navigate(`/dossier/${patient.medicalDossier.id}`, {
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
        <div className="p-6 border-b border-black justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img src={icon1} alt="Identité" className="mr-2 align-center w-8" />
            Identité
          </div>
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={formData.prenom}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <input
            type="text"
            name="ville"
            placeholder="Ville"
            value={formData.ville}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <input
            type="text"
            name="profession"
            placeholder="Profession"
            value={formData.profession}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <input
            type="text"
            name="assurance"
            placeholder="Assurance"
            value={formData.assurance}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <input
            type="text"
            name="referenceID"
            placeholder="Reference ID"
            value={formData.referenceID}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold mt-2 p-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Mise à jour en cours..." : "Mettre à jour"}
          </button>
        </form>
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
