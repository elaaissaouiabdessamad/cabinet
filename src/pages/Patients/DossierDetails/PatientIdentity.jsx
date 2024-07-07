import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PatientService from "../../../services/patient.service";
import icon1 from "../../../assets/icon1.png";
import HeaderDossier from "../../../components/HeaderDossier";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
    familyPhone: patient?.familyPhone || "",
    fullAddress: patient?.fullAddress || "",
    maritalStatus: patient?.maritalStatus || "",
    region: patient?.region || "",
  });

  const [loading, setLoading] = useState(false);
  const [showProfessionInput, setShowProfessionInput] = useState(false);
  const [showAssuranceInput, setShowAssuranceInput] = useState(false);
  const [showVilleInput, setShowVilleInput] = useState(false);
  const [showRegionInput, setShowRegionInput] = useState(false);
  const [showMaritalStatusInput, setShowMaritalStatusInput] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (e, type) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    switch (type) {
      case "ville":
        setShowVilleInput(value === "Autre");
        break;
      case "assurance":
        setShowAssuranceInput(value === "Autre");
        break;
      case "profession":
        setShowProfessionInput(value === "Autre");
        break;
      case "region":
        setShowRegionInput(value === "Autre");
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedPatientData = await PatientService.updatePatient(
        patient.id,
        formData
      );
      console.log(formData);
      const updatedPatient = {
        ...patient,
        ...updatedPatientData.data,
        bedAssignmentHistories: patient.bedAssignmentHistories,
        medicalDossier: patient.medicalDossier,
      };
      console.log(patient);
      console.log(updatedPatientData);
      setPatient(updatedPatient);
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
      <div className="bg-white border border-black rounded-3xl shadow-lg w-2/3">
        <div className="p-6 border-b border-black justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img src={icon1} alt="Identité" className="mr-2 align-center w-8" />
            Identité
          </div>
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="flex space-x-4 mb-3">
            {[
              { name: "nom", label: "Nom", type: "text" },
              { name: "prenom", label: "Prénom", type: "text" },
              { name: "age", label: "Âge", type: "number" },
            ].map(({ name, label, type }) => (
              <div className="relative mb-4 w-1/3" key={name}>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                  placeholder=" "
                  id={name}
                />
                <label
                  htmlFor={name}
                  className="absolute left-2 -top-3 text-gray-500 transition-all transform peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-blue-500 bg-white px-1"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>

          <div className="flex space-x-4 mb-3">
            {[
              { name: "referenceID", label: "Reference ID", type: "text" },
              {
                name: "familyPhone",
                label: "Téléphone de famille ou tuteur",
                type: "text",
              },
            ].map(({ name, label, type }) => (
              <div className="relative mb-4 w-1/3" key={name}>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                  placeholder=" "
                  id={name}
                />
                <label
                  htmlFor={name}
                  className="absolute left-2 -top-3 text-gray-500 transition-all transform peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-blue-500 bg-white px-1"
                >
                  {label}
                </label>
              </div>
            ))}
            <div className="relative mb-4 w-1/3">
              {!showMaritalStatusInput && (
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={(e) => handleSelectChange(e, "maritalStatus")}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                >
                  <option value="" disabled>
                    Sélectionner un état civil
                  </option>
                  {maritalStatus.map((status) => (
                    <option key={status} value={status}>
                      {status}
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                  placeholder="Entrez un autre état civil"
                />
              )}
              <label
                htmlFor="maritalStatus"
                className="absolute left-2 -top-3 text-gray-500 transition-all transform peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-blue-500 bg-white px-1"
              >
                État civil
              </label>
            </div>
          </div>

          <div className="flex space-x-4 mb-3 items-center">
            <div className="relative mb-4 w-1/4">
              {!showRegionInput && (
                <select
                  name="region"
                  value={formData.region}
                  onChange={(e) => handleSelectChange(e, "region")}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                >
                  <option value="" disabled>
                    Sélectionner une région
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                  placeholder="Entrez une autre région"
                />
              )}
              <label
                htmlFor="region"
                className="absolute left-2 -top-3 text-gray-500 transition-all transform peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-blue-500 bg-white px-1"
              >
                Région
              </label>
            </div>
            <div className="relative mb-4 w-1/4">
              {!showVilleInput && (
                <select
                  name="ville"
                  value={formData.ville}
                  onChange={(e) => handleSelectChange(e, "ville")}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                >
                  <option value="" disabled>
                    Sélectionner une ville
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                  placeholder="Entrez une autre ville"
                />
              )}
              <label
                htmlFor="ville"
                className="absolute left-2 -top-3 text-gray-500 transition-all transform peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-blue-500 bg-white px-1"
              >
                Ville
              </label>
            </div>
            <div className="relative mb-4 w-1/2">
              <input
                type="text"
                name="fullAddress"
                value={formData.fullAddress}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                placeholder=" "
                id="fullAddress"
              />
              <label
                htmlFor="fullAddress"
                className="absolute left-2 -top-3 text-gray-500 transition-all transform peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-blue-500 bg-white px-1"
              >
                Adresse complète
              </label>
            </div>
          </div>

          <div className="flex mb-4 space-x-4">
            <div className="relative mb-4 w-1/2">
              {!showProfessionInput && (
                <select
                  name="profession"
                  value={formData.profession}
                  onChange={(e) => handleSelectChange(e, "profession")}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                >
                  <option value="" disabled>
                    Sélectionner une profession
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                  placeholder="Entrez une autre profession"
                />
              )}
              <label
                htmlFor="profession"
                className="absolute left-2 -top-3 text-gray-500 transition-all transform peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-blue-500 bg-white px-1"
              >
                Profession
              </label>
            </div>

            <div className="relative mb-4 w-1/2">
              {!showAssuranceInput && (
                <select
                  name="assurance"
                  value={formData.assurance}
                  onChange={(e) => handleSelectChange(e, "assurance")}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                >
                  <option value="" disabled>
                    Sélectionner une assurance
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                  placeholder="Entrez une autre assurance"
                />
              )}
              <label
                htmlFor="assurance"
                className="absolute left-2 -top-3 text-gray-500 transition-all transform peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-blue-500 bg-white px-1"
              >
                Assurance
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold p-2 rounded-lg"
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
          Suivant <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default PatientIdentity;
