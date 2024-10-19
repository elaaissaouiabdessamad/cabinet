import React, { useState } from "react";
import PatientService from "../../services/patient.service";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

const professions = [
  "Médecin",
  "Ingénieur",
  "Enseignant",
  "Commerçant",
  "Agriculteur",
  "Infirmier",
  "Avocat",
  "Architecte",
  "Journaliste",
  "Artisan",
  "Policier",
  "Pompier",
  "Pharmacien",
  "Électricien",
  "Designer",
  "Chirurgien",
  "Psychologue",
  "Économiste",
  "Traducteur",
  "Sociologue",
  "Biologiste",
  "Chercheur",
  "Vétérinaire",
  "Photographe",
  "Développeur",
  "Graphiste",
  "Musicien",
  "Écrivain",
  "Acteur",
  "Danseur",
];

const villes = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fes",
  "Tangier",
  "Agadir",
  "Essaouira",
  "Ouarzazate",
  "Chefchaouen",
  "El Jadida",
  "Tétouan",
  "Kenitra",
  "Mohammedia",
  "Tanger",
  "Meknes",
  "Oujda",
  "Beni Mellal",
  "Taroudant",
  "Dakhla",
  "Laayoune",
  "Safi",
  "Errachidia",
  "Guelmim",
  "Al Hoceima",
  "Nador",
  "Settat",
  "Khémisset",
  "Larache",
  "Taza",
  "Sidi Ifni",
];

const assurances = [
  "CNSS",
  "CNOPS",
  "Assurance privée",
  "RAMED",
  "AXA Assurance",
  "Allianz Assurance",
  "Wafa Assurance",
  "Saham Assurance",
  "Sanad Assurance",
  "Atlanta Assurance",
  "MAAF Assurance",
  "MACIF Assurance",
  "Matmut Assurance",
  "Groupama Assurance",
  "MAIF Assurance",
  "GMF Assurance",
  "AG2R La Mondiale",
  "Swiss Life",
  "MMA Assurance",
  "April Assurance",
  "CNP Assurance",
  "Generali Assurance",
  "Covéa Assurance",
  "Prévoir Assurance",
  "Harmonie Mutuelle",
  "Malakoff Humanis",
  "Klesia Assurance",
  "Humanis Assurance",
  "OCIRP Assurance",
  "IPSEN Assurance",
];

const regions = [
  "Tanger-Tetouan-Al Hoceima",
  "Oriental",
  "Fès-Meknès",
  "Rabat-Salé-Kénitra",
  "Béni Mellal-Khénifra",
  "Casablanca-Settat",
  "Marrakech-Safi",
  "Drâa-Tafilalet",
  "Souss-Massa",
  "Guelmim-Oued Noun",
  "Laâyoune-Sakia El Hamra",
  "Dakhla-Oued Ed-Dahab",
];

const maritalStatus = [
  "Célibataire",
  "Marié(e)",
  "Divorcé(e)",
  "Veuf(ve)",
  "Séparé(e)",
  "Partenaire de vie",
];

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
    region: "",
    familyPhone: "",
    fullAddress: "",
    maritalStatus: "",
  });
  const [showRegionInput, setShowRegionInput] = useState(false);
  const [showVilleInput, setShowVilleInput] = useState(false);
  const [showAssuranceInput, setShowAssuranceInput] = useState(false);
  const [showProfessionInput, setShowProfessionInput] = useState(false);
  const [showMaritalStatusInput, setShowMaritalStatusInput] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (e, type) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    switch (type) {
      case "region":
        setShowRegionInput(value === "Autre");
        break;
      case "ville":
        setShowVilleInput(value === "Autre");
        break;
      case "assurance":
        setShowAssuranceInput(value === "Autre");
        break;
      case "profession":
        setShowProfessionInput(value === "Autre");
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await PatientService.addPatient(formData);
      if (response && response.data) {
        const createdPatient = response.data;
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
    <div className="flex justify-center items-center mt-12 p-6">
      <ToastContainer
        draggable
        closeOnClick
        position="bottom-right"
        autoClose={5000}
      />
      <div className="bg-white p-8 rounded-lg shadow-lg border w-3/4">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Formulaire d'ajout d'un nouveau patient
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4 mb-3">
            <div className="relative w-1/3">
              <label className="block text-gray-700">Prénom</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="w-full p-1 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Entrez le prénom"
              />
            </div>
            <div className="relative w-1/3">
              <label className="block text-gray-700">Nom</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full p-1 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Entrez le nom"
              />
            </div>
            <div className="relative w-1/3">
              <label className="block text-gray-700">Âge</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-1 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Entrez l'âge"
              />
            </div>
          </div>

          <div className="flex space-x-4 mb-3">
            <div className="relative w-1/2">
              <label className="block text-gray-700">Profession</label>
              {!showProfessionInput && (
                <select
                  name="profession"
                  value={formData.profession}
                  onChange={(e) => handleSelectChange(e, "profession")}
                  className="w-full p-1 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Sélectionnez une profession
                  </option>
                  {professions.map((profession) => (
                    <option key={profession} value={profession}>
                      {profession}
                    </option>
                  ))}
                  <option value="Autre">Autre</option>
                </select>
              )}
              {showProfessionInput && (
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  placeholder="Entrez la profession"
                  required
                  className="w-full p-1 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
            <div className="relative w-1/2">
              <label className="block text-gray-700">Assurance</label>
              {!showAssuranceInput && (
                <select
                  name="assurance"
                  value={formData.assurance}
                  onChange={(e) => handleSelectChange(e, "assurance")}
                  required
                  className="w-full p-1 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Sélectionnez une assurance
                  </option>
                  {assurances.map((assurance) => (
                    <option key={assurance} value={assurance}>
                      {assurance}
                    </option>
                  ))}
                  <option value="Autre">Autre</option>
                </select>
              )}
              {showAssuranceInput && (
                <input
                  type="text"
                  name="assurance"
                  value={formData.assurance}
                  onChange={handleChange}
                  placeholder="Entrez l'assurance"
                  required
                  className="w-full p-1 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          </div>
          <div className="flex space-x-4 mb-3">
            <div className="relative w-1/2">
              <label className="block text-gray-700">
                Téléphone de famille ou tuteur
              </label>
              <input
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                name="familyPhone"
                value={formData.familyPhone}
                onChange={handleChange}
                className="w-full p-1 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Entrez le numéro de téléphone"
              />
            </div>
            <div className="relative w-1/2">
              <label className="block text-gray-700">État civil</label>
              {!showMaritalStatusInput && (
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={(e) => handleSelectChange(e, "maritalStatus")}
                  className="w-full p-1 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Sélectionnez une état civil
                  </option>
                  {maritalStatus.map((maritalStatus) => (
                    <option key={maritalStatus} value={maritalStatus}>
                      {maritalStatus}
                    </option>
                  ))}
                </select>
              )}
              {showMaritalStatusInput && (
                <input
                  type="text"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  placeholder="Entrez l'état civil"
                  required
                  className="w-full p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="relative w-1/4 mb-4">
              <label className="block text-gray-700">Région</label>
              {!showRegionInput && (
                <select
                  name="region"
                  required
                  value={formData.region}
                  onChange={(e) => handleSelectChange(e, "region")}
                  className="w-full p-1 border rounded-lg focus:outline-none text-gray-600 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Sélectionnez une région
                  </option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                  <option value="Autre">Autre</option>
                </select>
              )}
              {showRegionInput && (
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  placeholder="Entrez la region"
                  required
                  className="w-full p-1 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
            <div className="relative w-1/4">
              <label className="block text-gray-700">Ville</label>
              {!showVilleInput && (
                <select
                  name="ville"
                  required
                  value={formData.ville}
                  onChange={(e) => handleSelectChange(e, "ville")}
                  className={`w-full p-1 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="" disabled>
                    Sélectionnez une ville
                  </option>
                  {villes.map((ville) => (
                    <option key={ville} value={ville}>
                      {ville}
                    </option>
                  ))}
                  <option value="Autre">Autre</option>
                </select>
              )}

              {showVilleInput && (
                <input
                  type="text"
                  name="ville"
                  value={formData.ville}
                  onChange={handleChange}
                  placeholder="Entrez la ville"
                  required
                  className="w-full p-1 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
            <div className="relative w-1/2">
              <label className="block text-gray-700">Adresse complète</label>
              <input
                type="text"
                name="fullAddress"
                value={formData.fullAddress}
                onChange={handleChange}
                className="w-full p-1 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Entrez l'adresse complète"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#8f8df2] text-white rounded-lg hover:bg-[#7e8ce1] transition duration-200 flex items-center justify-center"
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
