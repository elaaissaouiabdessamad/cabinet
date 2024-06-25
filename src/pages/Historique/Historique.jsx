import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiChevronDown,
  FiChevronUp,
  FiUser,
  FiHome,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import {
  FaBed,
  FaSignInAlt,
  FaSignOutAlt,
  FaTimesCircle,
} from "react-icons/fa";
import PatientService from "../../services/patient.service";

const Historique = () => {
  const [patients, setPatients] = useState([]);
  const [expandedPatientId, setExpandedPatientId] = useState(null);
  const [statusFilters, setStatusFilters] = useState({
    pasEncoreAssigne: true,
    actuellementHospitalise: true,
    sortiDeLhopital: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await PatientService.getAllPatients();
      setPatients(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des patients : ", error);
    }
  };

  const handleViewDossierShow = (patient) => {
    navigate(`/dossier/show/${patient.medicalDossier.id}`, {
      state: { patient },
    });
  };

  const getLastBedAssignment = (histories) => {
    if (histories.length === 0) return null;
    return histories.reduce((latest, history) =>
      new Date(history.startDateTime) > new Date(latest.startDateTime)
        ? history
        : latest
    );
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case "Pas encore assigné à aucun lit":
        return "text-red-500";
      case "Actuellement hospitalisé":
        return "text-blue-500";
      case "Sorti de l'hôpital":
        return "text-gray-500";
      default:
        return "text-black";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pas encore assigné à aucun lit":
        return <FiXCircle className="text-red-500" />;
      case "Actuellement hospitalisé":
        return <FiUser className="text-blue-500" />;
      case "Sorti de l'hôpital":
        return <FiHome className="text-gray-500" />;
      default:
        return <FiCheckCircle className="text-black" />;
    }
  };

  const toggleAccordion = (patientId) => {
    setExpandedPatientId(expandedPatientId === patientId ? null : patientId);
  };

  const getPatientStatus = (patient, lastHistory) => {
    if (!lastHistory) {
      return "Pas encore assigné à aucun lit";
    } else if (!lastHistory.endDateTime) {
      return "Actuellement hospitalisé";
    } else {
      return "Sorti de l'hôpital";
    }
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilters((prevFilters) => ({
      ...prevFilters,
      [status]: !prevFilters[status],
    }));
  };

  const isPatientVisible = (patientStatus) => {
    switch (patientStatus) {
      case "Pas encore assigné à aucun lit":
        return statusFilters.pasEncoreAssigne;
      case "Actuellement hospitalisé":
        return statusFilters.actuellementHospitalise;
      case "Sorti de l'hôpital":
        return statusFilters.sortiDeLhopital;
      default:
        return true;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Historique des patients</h1>
      <div className="mb-4 ml-4 flex flex-col sm:flex-row">
        <div className="flex items-center mr-4 mb-2 sm:mb-0">
          <input
            type="checkbox"
            checked={statusFilters.pasEncoreAssigne}
            onChange={() => handleStatusFilterChange("pasEncoreAssigne")}
            className="mr-2"
          />
          <label>Pas encore assigné à aucun lit</label>
        </div>
        <div className="flex items-center mr-4 mb-2 sm:mb-0">
          <input
            type="checkbox"
            checked={statusFilters.actuellementHospitalise}
            onChange={() => handleStatusFilterChange("actuellementHospitalise")}
            className="mr-2"
          />
          <label>Actuellement hospitalisé</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={statusFilters.sortiDeLhopital}
            onChange={() => handleStatusFilterChange("sortiDeLhopital")}
            className="mr-2"
          />
          <label>Sorti de l'hôpital</label>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md p-4">
        {patients.filter((patient) => {
          const lastHistory = getLastBedAssignment(
            patient.bedAssignmentHistories
          );
          const patientStatus = getPatientStatus(patient, lastHistory);
          return isPatientVisible(patientStatus);
        }).length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            Aucun patient trouvé.
          </div>
        ) : (
          patients
            .filter((patient) => {
              const lastHistory = getLastBedAssignment(
                patient.bedAssignmentHistories
              );
              const patientStatus = getPatientStatus(patient, lastHistory);
              return isPatientVisible(patientStatus);
            })
            .map((patient) => {
              const lastHistory = getLastBedAssignment(
                patient.bedAssignmentHistories
              );
              const patientStatus = getPatientStatus(patient, lastHistory);

              return (
                <div
                  key={patient.id}
                  className="mb-8 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center justify-between border-b border-gray-200 py-4 px-4 bg-gray-50 rounded-t-lg">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <span className="font-semibold text-lg mr-2">
                        {`Patient ${patient.prenom} ${patient.nom} / ${patient.referenceID}`}
                      </span>
                      <span
                        className={`${getStatusColorClass(
                          patientStatus
                        )} flex items-center`}
                      >
                        {getStatusIcon(patientStatus)}
                        <strong className="ml-1"> {patientStatus}</strong>
                      </span>
                      {lastHistory && (
                        <div className="mt-2 md:mt-0 md:ml-4">
                          {lastHistory.startDateTime &&
                            !lastHistory.endDateTime && (
                              <span>
                                <span className="font-semibold">Entré le </span>
                                {new Date(
                                  lastHistory.startDateTime
                                ).toLocaleDateString("fr-FR")}
                                <br />
                                <span className="font-semibold">Période </span>
                                {Math.floor(
                                  (new Date() -
                                    new Date(lastHistory.startDateTime)) /
                                    (1000 * 60 * 60 * 24)
                                ) > 0 && (
                                  <span>
                                    {Math.floor(
                                      (new Date() -
                                        new Date(lastHistory.startDateTime)) /
                                        (1000 * 60 * 60 * 24)
                                    )}{" "}
                                    {Math.floor(
                                      (new Date() -
                                        new Date(lastHistory.startDateTime)) /
                                        (1000 * 60 * 60 * 24)
                                    ) === 1
                                      ? "jour"
                                      : "jours"}
                                    {", "}
                                  </span>
                                )}
                                {Math.floor(
                                  ((new Date() -
                                    new Date(lastHistory.startDateTime)) %
                                    (1000 * 60 * 60 * 24)) /
                                    (1000 * 60 * 60)
                                ) > 0 && (
                                  <span>
                                    {Math.floor(
                                      ((new Date() -
                                        new Date(lastHistory.startDateTime)) %
                                        (1000 * 60 * 60 * 24)) /
                                        (1000 * 60 * 60)
                                    )}{" "}
                                    {Math.floor(
                                      ((new Date() -
                                        new Date(lastHistory.startDateTime)) %
                                        (1000 * 60 * 60 * 24)) /
                                        (1000 * 60 * 60)
                                    ) === 1
                                      ? "heure"
                                      : "heures"}
                                    {", "}
                                  </span>
                                )}
                                {Math.floor(
                                  (((new Date() -
                                    new Date(lastHistory.startDateTime)) %
                                    (1000 * 60 * 60 * 24)) %
                                    (1000 * 60 * 60)) /
                                    (1000 * 60)
                                ) > 0 && (
                                  <span>
                                    {Math.floor(
                                      (((new Date() -
                                        new Date(lastHistory.startDateTime)) %
                                        (1000 * 60 * 60 * 24)) %
                                        (1000 * 60 * 60)) /
                                        (1000 * 60)
                                    )}{" "}
                                    {Math.floor(
                                      (((new Date() -
                                        new Date(lastHistory.startDateTime)) %
                                        (1000 * 60 * 60 * 24)) %
                                        (1000 * 60 * 60)) /
                                        (1000 * 60)
                                    ) === 1
                                      ? "minute"
                                      : "minutes"}
                                    {", "}
                                  </span>
                                )}
                                {Math.floor(
                                  ((((new Date() -
                                    new Date(lastHistory.startDateTime)) %
                                    (1000 * 60 * 60 * 24)) %
                                    (1000 * 60 * 60)) %
                                    (1000 * 60)) /
                                    1000
                                ) > 0 && (
                                  <span>
                                    {Math.floor(
                                      ((((new Date() -
                                        new Date(lastHistory.startDateTime)) %
                                        (1000 * 60 * 60 * 24)) %
                                        (1000 * 60 * 60)) %
                                        (1000 * 60)) /
                                        1000
                                    )}{" "}
                                    {Math.floor(
                                      ((((new Date() -
                                        new Date(lastHistory.startDateTime)) %
                                        (1000 * 60 * 60 * 24)) %
                                        (1000 * 60 * 60)) %
                                        (1000 * 60)) /
                                        1000
                                    ) === 1
                                      ? "seconde"
                                      : "secondes"}
                                  </span>
                                )}
                              </span>
                            )}

                          {lastHistory.endDateTime && (
                            <span>
                              <span className="font-semibold">Sorti le </span>
                              {new Date(
                                lastHistory.endDateTime
                              ).toLocaleDateString("fr-FR")}
                              {lastHistory.startDateTime && (
                                <span>
                                  <br />
                                  <span className="font-semibold">
                                    Période{" "}
                                  </span>
                                  {Math.floor(
                                    (new Date(lastHistory.endDateTime) -
                                      new Date(lastHistory.startDateTime)) /
                                      (1000 * 60 * 60 * 24)
                                  ) > 0 && (
                                    <span>
                                      {Math.floor(
                                        (new Date(lastHistory.endDateTime) -
                                          new Date(lastHistory.startDateTime)) /
                                          (1000 * 60 * 60 * 24)
                                      )}{" "}
                                      {Math.floor(
                                        (new Date(lastHistory.endDateTime) -
                                          new Date(lastHistory.startDateTime)) /
                                          (1000 * 60 * 60 * 24)
                                      ) === 1
                                        ? "jour"
                                        : "jours"}
                                      {", "}
                                    </span>
                                  )}
                                  {Math.floor(
                                    ((new Date(lastHistory.endDateTime) -
                                      new Date(lastHistory.startDateTime)) %
                                      (1000 * 60 * 60 * 24)) /
                                      (1000 * 60 * 60)
                                  ) > 0 && (
                                    <span>
                                      {Math.floor(
                                        ((new Date(lastHistory.endDateTime) -
                                          new Date(lastHistory.startDateTime)) %
                                          (1000 * 60 * 60 * 24)) /
                                          (1000 * 60 * 60)
                                      )}{" "}
                                      {Math.floor(
                                        ((new Date(lastHistory.endDateTime) -
                                          new Date(lastHistory.startDateTime)) %
                                          (1000 * 60 * 60 * 24)) /
                                          (1000 * 60 * 60)
                                      ) === 1
                                        ? "heure"
                                        : "heures"}
                                      {", "}
                                    </span>
                                  )}
                                  {Math.floor(
                                    (((new Date(lastHistory.endDateTime) -
                                      new Date(lastHistory.startDateTime)) %
                                      (1000 * 60 * 60 * 24)) %
                                      (1000 * 60 * 60)) /
                                      (1000 * 60)
                                  ) > 0 && (
                                    <span>
                                      {Math.floor(
                                        (((new Date(lastHistory.endDateTime) -
                                          new Date(lastHistory.startDateTime)) %
                                          (1000 * 60 * 60 * 24)) %
                                          (1000 * 60 * 60)) /
                                          (1000 * 60)
                                      )}{" "}
                                      {Math.floor(
                                        (((new Date(lastHistory.endDateTime) -
                                          new Date(lastHistory.startDateTime)) %
                                          (1000 * 60 * 60 * 24)) %
                                          (1000 * 60 * 60)) /
                                          (1000 * 60)
                                      ) === 1
                                        ? "minute"
                                        : "minutes"}
                                      {", "}
                                    </span>
                                  )}
                                  {Math.floor(
                                    ((((new Date(lastHistory.endDateTime) -
                                      new Date(lastHistory.startDateTime)) %
                                      (1000 * 60 * 60 * 24)) %
                                      (1000 * 60 * 60)) %
                                      (1000 * 60)) /
                                      1000
                                  ) > 0 && (
                                    <span>
                                      {Math.floor(
                                        ((((new Date(lastHistory.endDateTime) -
                                          new Date(lastHistory.startDateTime)) %
                                          (1000 * 60 * 60 * 24)) %
                                          (1000 * 60 * 60)) %
                                          (1000 * 60)) /
                                          1000
                                      )}{" "}
                                      {Math.floor(
                                        ((((new Date(lastHistory.endDateTime) -
                                          new Date(lastHistory.startDateTime)) %
                                          (1000 * 60 * 60 * 24)) %
                                          (1000 * 60 * 60)) %
                                          (1000 * 60)) /
                                          1000
                                      ) === 1
                                        ? "seconde"
                                        : "secondes"}
                                    </span>
                                  )}
                                </span>
                              )}
                              {lastHistory.bed && (
                                <span>, Lit {lastHistory.bed.id}</span>
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center mt-2 md:mt-0">
                      <button
                        onClick={() => handleViewDossierShow(patient)}
                        className="bg-[#8f8df2] text-white py-2 px-4 rounded hover:bg-[#7f7de2] transition"
                      >
                        Voir le dossier
                      </button>
                      {patient.bedAssignmentHistories.length > 0 && (
                        <button
                          onClick={() => toggleAccordion(patient.id)}
                          className="ml-4 focus:outline-none"
                        >
                          {expandedPatientId === patient.id ? (
                            <FiChevronUp className="text-xl" />
                          ) : (
                            <FiChevronDown className="text-xl" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                  {expandedPatientId === patient.id && (
                    <div className="px-4 py-2 bg-white rounded-b-lg">
                      {patient.bedAssignmentHistories.map((history, index) => (
                        <div
                          key={index}
                          className="border-t border-gray-300 pt-4 mt-4 grid grid-cols-3 gap-4 items-center text-center"
                        >
                          <div className="flex flex-col items-center">
                            <FaSignInAlt className="text-green-500 mb-2" />
                            <span>
                              <span className="font-semibold">Entrée :</span>{" "}
                              {new Date(history.startDateTime).toLocaleString(
                                "fr-FR"
                              )}
                            </span>
                          </div>
                          <div className="flex flex-col items-center">
                            {history.endDateTime ? (
                              <>
                                <FaSignOutAlt className="text-red-500 mb-2" />
                                <span>
                                  <span className="font-semibold">
                                    Sortie :
                                  </span>{" "}
                                  {new Date(history.endDateTime).toLocaleString(
                                    "fr-FR"
                                  )}
                                </span>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle className="text-gray-500 mb-2" />
                                <span>
                                  <span className="font-semibold">
                                    Encore hospitalisé
                                  </span>
                                </span>
                              </>
                            )}
                          </div>
                          <div className="flex flex-col items-center">
                            <FaBed className="text-blue-500 mb-2" />
                            <span>
                              <span className="font-semibold">Lit :</span>{" "}
                              {history.bedAssignedId}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default Historique;
