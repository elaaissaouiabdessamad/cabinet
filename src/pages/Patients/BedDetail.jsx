import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import BedService from "../../services/bed.service";
import PatientService from "../../services/patient.service";
import DoctorService from "../../services/doctor.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnowflake, faProcedures } from "@fortawesome/free-solid-svg-icons";
const BedDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [bed, setBed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientsWithoutBed, setPatientsWithoutBed] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const { sectorId } = location.state || {};

  useEffect(() => {
    const fetchBed = async () => {
      try {
        const response = await BedService.getBedById(id);
        setBed(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBed();
  }, [id]);

  useEffect(() => {
    const fetchPatientsWithoutBed = async () => {
      try {
        const response = await PatientService.getPatientWithoutBed();
        setPatientsWithoutBed(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des patients sans lit:",
          error
        );
      }
    };

    fetchPatientsWithoutBed();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await DoctorService.getAllDoctors();
        setDoctors(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des médecins:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleAssignPatient = async () => {
    if (!selectedPatientId && !selectedDoctorId) {
      toast.error("Veuillez sélectionner un patient et un médecin.");
      return;
    }
    if (!selectedPatientId) {
      toast.error("Veuillez sélectionner un patient.");
      return;
    }
    if (!selectedDoctorId) {
      toast.error("Veuillez sélectionner un médecin.");
      return;
    }

    try {
      await BedService.assignPatientToBed(
        bed.id,
        selectedPatientId,
        selectedDoctorId
      );
      const updatedBed = await BedService.getBedById(bed.id);
      setBed(updatedBed.data);
      toast.success("Patient et médecin assignés avec succès.");
    } catch (error) {
      console.error("Erreur lors de l'attribution du patient au lit:", error);
      toast.error("Échec de l'attribution du patient et du médecin.");
    }
  };

  const handleUpdateDossier = () => {
    navigate(`/dossier/${bed.currentPatient.medicalDossier.id}`, {
      state: { patient: bed.currentPatient, color: getBgColor() },
    });
  };

  const handleViewDossier = () => {
    navigate(`/dossier/show/${bed.currentPatient.medicalDossier.id}`, {
      state: { patient: bed.currentPatient, color: getBgColor() },
    });
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!bed) {
    return <div>Lit pas trouvé</div>;
  }

  const { currentPatient } = bed;

  const getBgColor = () => {
    if (bed.state === "EMPTY") {
      return "blue-500";
    }
    const daysOccupied = moment().diff(moment(bed.startDateTime), "days");
    if (daysOccupied < 10) {
      return "green-500";
    }
    return "red-500";
  };

  const calculateDaysOccupied = (startDateTime) => {
    const daysOccupied = moment().diff(moment(startDateTime), "days");
    return daysOccupied;
  };

  const handlePatientSector = () => {
    navigate(`/patients/${sectorId}`, {
      state: { sectorId },
    });
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="flex items-center mb-4 w-full">
        <div className="flex items-center w-full relative">
          <button
            onClick={handlePatientSector}
            className="mr-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center"
          >
            <i className="fa fa-angle-double-left"></i>&nbsp; Au secteur&nbsp;
            {sectorId == 1 ? "USI" : "froid"}
            &nbsp;&nbsp;
            <FontAwesomeIcon
              icon={sectorId == 1 ? faProcedures : faSnowflake}
              className="mr-2"
            />{" "}
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow p-2 border rounded-lg"
          />
          <button className="absolute right-0 top-0 mr-2 p-2 rounded-lg">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <button className="ml-4 p-2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2
        className={`shadow-md text-xl font-bold text-center bg-${getBgColor()} text-white py-2 w-full max-w-md`}
      >
        LIT {bed.id}
        <span className="block text-sm">
          {currentPatient
            ? "Patient ref ID : " + currentPatient.referenceID
            : ""}
        </span>
      </h2>
      <div className="shadow-md bg-white space-y-2 p-6 w-full max-w-md">
        {currentPatient ? (
          <>
            <div className="flex justify-between">
              <span className="font-semibold">Nom</span>
              <span>{currentPatient.nom}</span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span className="font-semibold">Prénom</span>
              <span>{currentPatient.prenom}</span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span className="font-semibold">Âge</span>
              <span>{currentPatient.age}</span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span className="font-semibold">Ville</span>
              <span>{currentPatient.ville}</span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span className="font-semibold">Assurance</span>
              <span>{currentPatient.assurance}</span>
            </div>
            <hr />
            {currentPatient.medicalDossier ? (
              <>
                <div className="flex justify-between">
                  <span className="font-semibold">Motif d'hospitalisation</span>
                  <span className="ml-1 text-right">
                    {currentPatient.medicalDossier.hospitalization
                      ? currentPatient.medicalDossier.hospitalization.length >
                        60
                        ? `${currentPatient.medicalDossier.hospitalization.substring(
                            0,
                            60
                          )}...`
                        : currentPatient.medicalDossier.hospitalization
                      : "N/A"}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between">
                  <span className="font-semibold">Diagnostic</span>
                  <span>
                    {`${calculateDaysOccupied(
                      bed.startDateTime
                    )} jours occupés`}
                  </span>
                </div>
                <hr />
              </>
            ) : (
              <div className="text-center text-gray-500">
                Aucun dossier médical trouvé
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-500">
            Aucun patient n'est assigné à ce lit
          </div>
        )}
      </div>
      {bed.state === "EMPTY" && (
        <div className="mt-4 w-full max-w-md">
          <label className="block text-gray-700">
            Sélectionner un patient:
          </label>
          <select
            className="mt-1 p-2 w-full border rounded-lg"
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
          >
            <option value="" disabled>
              👤Choisissez un patient
            </option>

            {patientsWithoutBed.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.prenom} {patient.nom} - ref: {patient.referenceID}
              </option>
            ))}
          </select>
          <label className="block text-gray-700 mt-4">
            Sélectionner un médecin:
          </label>
          <select
            className="mt-1 p-2 w-full border rounded-lg"
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
          >
            <option value="" disabled>
              ⚕️Choisissez un médecin
            </option>{" "}
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.prenom} {doctor.nom} - {doctor.specialty}
              </option>
            ))}
          </select>
          <button
            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            onClick={handleAssignPatient}
          >
            Attribuer le patient et le médecin
          </button>
        </div>
      )}
      {currentPatient?.medicalDossier && (
        <div className="flex space-x-4 mt-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
            onClick={handleViewDossier}
          >
            Voir dossier
          </button>
          <button
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-200"
            onClick={handleUpdateDossier}
          >
            Editer dossier
          </button>
        </div>
      )}
    </div>
  );
};

export default BedDetail;
