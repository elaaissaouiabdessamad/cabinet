import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PatientService from "../../services/patient.service";
import BedService from "../../services/bed.service";

const PatientTable = () => {
  const [patients, setPatients] = useState([]);
  const [assignmentStatus, setAssignmentStatus] = useState({});
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
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
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [updateTrigger]);

  const isPatientAssigned = async (patientId) => {
    try {
      const response = await BedService.getBedByPatientId(patientId);
      return response.data.length > 0;
    } catch (error) {
      console.error("Error checking if patient is assigned:", error);
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

  const handleDeletePatient = async (patientId) => {
    try {
      await PatientService.deletePatient(patientId);
      setUpdateTrigger((prev) => !prev);
      setUpdateMessage("Patient deleted successfully.");
    } catch (error) {
      console.error("Error deleting patient:", error);
      setUpdateMessage("Error deleting patient.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Liste des Patients</h2>
      {updateMessage && <div className="text-green-500">{updateMessage}</div>}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nom</th>
            <th className="py-2 px-4 border-b">Prénom</th>
            <th className="py-2 px-4 border-b">Âge</th>
            <th className="py-2 px-4 border-b">Ville</th>
            <th className="py-2 px-4 border-b">Ref ID</th>
            <th className="py-2 px-4 border-b">Bed Assigné</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td className="py-2 px-4 border-b">{patient.id}</td>
              <td className="py-2 px-4 border-b">{patient.nom}</td>
              <td className="py-2 px-4 border-b">{patient.prenom}</td>
              <td className="py-2 px-4 border-b">{patient.age}</td>
              <td className="py-2 px-4 border-b">{patient.ville}</td>
              <td className="py-2 px-4 border-b">{patient.referenceID}</td>
              <td className="py-2 px-4 border-b">
                {assignmentStatus[patient.id] !== undefined
                  ? assignmentStatus[patient.id]
                    ? "Assigné"
                    : "Non assigné"
                  : "Loading..."}
              </td>
              <td className="py-2 px-4 border-b space-x-2">
                <button
                  onClick={() => handleDeletePatient(patient.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
                >
                  Supprimer
                </button>
                <button
                  onClick={() => handleViewDossierShow(patient)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition duration-200"
                >
                  Voir Dossier
                </button>
                <button
                  onClick={() => handleViewDossier(patient)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-200"
                >
                  Modifier Dossier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
