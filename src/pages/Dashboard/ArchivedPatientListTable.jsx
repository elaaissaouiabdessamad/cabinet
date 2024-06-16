import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import PatientService from "../../services/patient.service";
import BedService from "../../services/bed.service";
import MedicalService from "../../services/medical.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalDelete from "../../components/ModalDelete"; // Import du composant ModalDelete créé localement
import {
  FaTrashAlt,
  FaEye,
  FaEdit,
  FaArchive,
  FaFolderOpen,
} from "react-icons/fa"; // Add FaArchive icon

const ArchivedPatientListTable = () => {
  const [patients, setPatients] = useState([]);
  const [assignmentStatus, setAssignmentStatus] = useState({});
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [showAssigned, setShowAssigned] = useState(true);
  const [showUnassigned, setShowUnassigned] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [deletePatientId, setDeletePatientId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await PatientService.getAllPatients();
        const patientsData = response.data;
        setPatients(patientsData);
        patientsData.forEach(async (patient) => {
          const isAssigned = await isPatientAssigned(patient.id);
          setAssignmentStatus((prevStatus) => ({
            ...prevStatus,
            [patient.id]: isAssigned,
          }));
        });
      } catch (error) {
        toast.error("Erreur lors de la récupération des patients.");
        console.error("Erreur lors de la récupération des patients:", error);
      }
    };

    fetchPatients();
  }, [updateTrigger]);

  const isPatientAssigned = async (patientId) => {
    try {
      const response = await BedService.getBedByPatientId(patientId);
      return response.data.length > 0;
    } catch (error) {
      toast.error(
        "Erreur lors de la vérification de l'assignation du patient."
      );
      console.error(
        "Erreur lors de la vérification de l'assignation du patient:",
        error
      );
      return false;
    }
  };

  const handleViewDossier = (patient) => {
    navigate(`/dossier/${patient.medicalDossier.id}`, { state: { patient } });
  };

  const handleViewDossierShow = (patient) => {
    navigate(`/dossier/show/${patient.medicalDossier.id}`, {
      state: { patient },
    });
  };

  const handleDeletePatient = async () => {
    try {
      await PatientService.deletePatient(deletePatientId);
      setUpdateTrigger((prev) => !prev);
      toast.success("Patient supprimé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression du patient:", error);
      toast.error("Erreur lors de la suppression du patient.");
    }
    setIsDeleteModalOpen(false);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === "assigned") {
      setShowAssigned(checked);
    } else if (name === "unassigned") {
      setShowUnassigned(checked);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (columnName) => {
    if (sortedColumn === columnName) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(columnName);
      setSortDirection("asc");
    }
  };

  const handleDearchiveDossier = async (dossierId) => {
    try {
      await MedicalService.unarchiveMedicalDossier(dossierId);
      setUpdateTrigger((prev) => !prev);
      toast.success("Dossier désarchivé avec succès.");
    } catch (error) {
      console.error(
        "Erreur lors de le désarchivage du dossier médical:",
        error
      );
      toast.error("Erreur lors de le désarchivage du dossier médical.");
    }
  };

  const sortedPatients = [...patients].sort((a, b) => {
    const aValue = sortedColumn ? a[sortedColumn] : null;
    const bValue = sortedColumn ? b[sortedColumn] : null;
    if (sortedColumn === "id" || sortedColumn === "age") {
      if (sortDirection === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    } else {
      if (aValue && bValue) {
        if (sortDirection === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      }
      return 0;
    }
  });

  const filteredPatients = sortedPatients.filter((patient) => {
    const isAssigned = assignmentStatus[patient.id] || false;
    return (
      patient.medicalDossier.archived &&
      ((showAssigned && isAssigned) || (showUnassigned && !isAssigned)) &&
      (patient.id.toString().includes(searchTerm) ||
        patient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.age.toString().includes(searchTerm) ||
        patient.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.referenceID.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="main-content">
      <div className="p-4">
        <ToastContainer
          draggable
          closeOnClick
          position="bottom-right"
          autoClose={5000}
        />
        <h2 className="text-xl font-bold mb-4">Liste des Patients Archivés</h2>
        {updateMessage && (
          <div className="text-green-500 mb-4">{updateMessage}</div>
        )}
        <div className="flex justify-between mb-4">
          <div className="mr-4 items-center">
            <label className="mr-2">
              <input
                type="checkbox"
                name="assigned"
                checked={showAssigned}
                onChange={handleCheckboxChange}
              />
              Assigné
            </label>
            <label>
              <input
                type="checkbox"
                name="unassigned"
                checked={showUnassigned}
                onChange={handleCheckboxChange}
              />
              Non assigné
            </label>
          </div>
          <Link to="/patient-list">
            <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200">
              <FaFolderOpen className="inline-block mr-1" /> Aller à la liste
              des patients
            </button>
          </Link>
          <div className="flex items-center">
            <label className="mr-2">Chercher par mot-clé: </label>
            <input
              type="text"
              placeholder="Recherche..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border p-1 rounded-lg"
            />
          </div>
        </div>
        {filteredPatients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse bg-white">
              <thead>
                <tr>
                  <th
                    className="py-2 px-4 border text-center cursor-pointer"
                    onClick={() => handleSort("referenceID")}
                  >
                    Ref ID
                  </th>
                  <th
                    className="py-2 px-4 border text-center cursor-pointer"
                    onClick={() => handleSort("nom")}
                  >
                    Nom
                  </th>
                  <th
                    className="py-2 px-4 border text-center cursor-pointer"
                    onClick={() => handleSort("prenom")}
                  >
                    Prénom
                  </th>
                  <th
                    className="py-2 px-4 border text-center cursor-pointer"
                    onClick={() => handleSort("age")}
                  >
                    Âge
                  </th>
                  <th
                    className="py-2 px-4 border text-center cursor-pointer"
                    onClick={() => handleSort("ville")}
                  >
                    Ville
                  </th>
                  <th
                    className="py-2 px-4 border text-center cursor-pointer"
                    onClick={() => handleSort("isAssigned")}
                  >
                    Lit Assigné ?
                  </th>
                  <th className="py-2 px-4 border text-center">Patient</th>
                  <th className="py-2 px-4 border text-center">
                    Dossier Médical
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td className="py-2 px-4 border text-center">
                      {patient.referenceID}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {patient.nom}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {patient.prenom}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {patient.age}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {patient.ville}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {assignmentStatus[patient.id] !== undefined ? (
                        assignmentStatus[patient.id] ? (
                          <span className="text-green-500">Assigné</span>
                        ) : (
                          <span className="text-red-500">Non assigné</span>
                        )
                      ) : (
                        <span className="text-gray-500">Chargement...</span>
                      )}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      <div className="space-x-2">
                        <button
                          onClick={() => {
                            setDeletePatientId(patient.id);
                            setIsDeleteModalOpen(true);
                          }}
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-200"
                        >
                          <FaTrashAlt className="inline-block " /> Effacer
                        </button>
                      </div>
                    </td>
                    <td className="py-2 px-4 border text-center">
                      <div className="space-x-2">
                        <button
                          onClick={() => handleViewDossierShow(patient)}
                          className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition duration-200"
                        >
                          <FaEye className="inline-block mr-1" /> Voir
                        </button>
                        <button
                          onClick={() => handleViewDossier(patient)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-200"
                        >
                          <FaEdit className="inline-block mr-1" /> Modifier
                        </button>
                        <button
                          onClick={() =>
                            handleDearchiveDossier(patient.medicalDossier.id)
                          }
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200"
                        >
                          <FaFolderOpen className="inline-block mr-1" />{" "}
                          Désarchiver
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500">Aucun patient trouvé.</div>
        )}

        <ModalDelete
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setIsDeleteModalOpen(false)}
          handleDeletePatient={handleDeletePatient}
        />
      </div>
    </div>
  );
};

export default ArchivedPatientListTable;
