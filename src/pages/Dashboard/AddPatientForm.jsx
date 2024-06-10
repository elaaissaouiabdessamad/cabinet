import React, { useState } from "react";
import PatientService from "../../services/patient.service";
import { useNavigate } from "react-router-dom";

const AddPatientForm = ({ onPatientAdded }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    age: "",
    ville: "",
    assurance: "",
    profession: "",
    referenceID: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await PatientService.addPatient(formData);
      const createdPatient = response.data;
      onPatientAdded();
      console.log(createdPatient);

      if (createdPatient.medicalDossier && createdPatient.medicalDossier.id) {
        navigate(`/dossier/${createdPatient.medicalDossier.id}`, {
          state: { patient: createdPatient },
        });
      } else {
        console.error("Medical dossier ID not found in response.");
      }
    } catch (error) {
      console.error("Error adding patient:", error.response.data.message);
      setErrorMessage(error.response.data.message); // Set error message state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields */}
      <div>
        <label className="block text-gray-700">Nom</label>
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-lg"
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
          className="mt-1 p-2 w-full border rounded-lg"
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
          className="mt-1 p-2 w-full border rounded-lg"
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
          className="mt-1 p-2 w-full border rounded-lg"
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
          className="mt-1 p-2 w-full border rounded-lg"
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
          className="mt-1 p-2 w-full border rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Reference ID</label>
        <input
          type="text"
          name="referenceID"
          value={formData.referenceID}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-lg"
          required
        />
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}{" "}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Ajouter
      </button>
    </form>
  );
};

export default AddPatientForm;
