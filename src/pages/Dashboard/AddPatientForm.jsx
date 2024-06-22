import React, { useState } from "react";
import PatientService from "../../services/patient.service";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

const AddPatientForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    age: "",
    ville: "",
    assurance: "",
    profession: "",
    referenceID: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await PatientService.addPatient(formData);
      if (response && response.data) {
        const createdPatient = response.data;
        console.log(createdPatient);
        toast.success(response.data.message);
        if (createdPatient.medicalDossier && createdPatient.medicalDossier.id) {
          setTimeout(() => {
            navigate(`/dossier/${createdPatient.medicalDossier.id}`, {
              state: { patient: createdPatient, fromAddPatient: true },
            });
          }, 2000);
        } else {
          console.error(
            "Identifiant du dossier médical non trouvé dans la réponse."
          );
          setIsLoading(false);
        }
      } else {
        console.error("Réponse inattendue:", response);
        toast.error("Une erreur inattendue s'est produite.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du patient:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Une erreur s'est produite lors de l'ajout du patient.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4 p-6">
      <ToastContainer
        draggable
        closeOnClick
        position="bottom-right"
        autoClose={5000}
      />
      <div className="bg-white p-8 rounded-lg shadow-lg border w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-3">
          Formulaire d'ajout d'un nouveau patient
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Prénom</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="w-full p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Âge</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Ville</label>
            <input
              type="text"
              name="ville"
              value={formData.ville}
              onChange={handleChange}
              className="w-full p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Assurance</label>
            <input
              type="text"
              name="assurance"
              value={formData.assurance}
              onChange={handleChange}
              className="w-full p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Profession</label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className="w-full p-1 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#8f8df2] text-white rounded-lg hover:bg-[#7e8ce1] transition duration-200 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader size={24} color="#ffffff" />
            ) : (
              "Ajouter patient"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPatientForm;
