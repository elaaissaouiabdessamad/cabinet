import React, { useState, useEffect, useCallback } from "react";
import patientService from "../../services/patient.service";
import doctorService from "../../services/doctor.service";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/fr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderAgenda from "../../components/HeaderAgenda";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import relativeTime from "dayjs/plugin/relativeTime";
import AssignmentCard from "./AssignmentCard";
import AssignmentCardNotFound from "./AssignmentCardNotFound";
import { FaUserMd, FaUser, FaCalendarAlt } from "react-icons/fa";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalDeleteAssignment from "../../components/ModalDelete";

dayjs.extend(relativeTime);

dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(localizedFormat);
dayjs.locale("fr");
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatDateWithCapitalizedDay = (date) => {
  const formattedDate = dayjs(date).format("dddd DD MMMM YYYY HH:mm");
  const day = formattedDate.split(" ")[0];
  const restOfDate = formattedDate.slice(day.length);
  return capitalizeFirstLetter(day) + restOfDate;
};

const BlocRythmologie = () => {
  const [startDate, setStartDate] = useState(
    dayjs().format("YYYY-MM-DDT00:00")
  );
  const [endDate, setEndDate] = useState(
    dayjs().add(6, "day").format("YYYY-MM-DDT23:59")
  );
  const [assignments, setAssignments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState(null);
  const [isDeleteModalAssignmentOpen, setIsDeleteModalAssignmentOpen] =
    useState(false);
  const [deleteAssignmentId, setDeleteAssignmentId] = useState(null);
  const [assignmentDate, setAssignmentDate] = useState(
    dayjs().format("YYYY-MM-DDTHH:mm")
  );
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [closestAssignments, setClosestAssignments] = useState({
    before: null,
    after: null,
    beforeP: null,
    beforeD: null,
    afterP: null,
    afterD: null,
  });

  const handleDoctorChange = (e) => {
    const selectedDoctor = doctors.find(
      (doc) => doc.id === parseInt(e.target.value)
    );
    setDoctor(selectedDoctor);
  };

  const handlePatientChange = (e) => {
    const selectedPatient = patients.find(
      (pat) => pat.id === parseInt(e.target.value)
    );
    setPatient(selectedPatient);
  };

  const fetchAssignments = useCallback(async () => {
    try {
      const response = await patientService.getAllPatients();
      const filteredAssignments = response.data.flatMap((patient) =>
        patient.roomAssignments
          .filter((assignment) =>
            dayjs(assignment.assignmentDateTime).isBetween(startDate, endDate)
          )
          .map((assignment) => ({ ...assignment, patient }))
      );
      setAssignments(filteredAssignments);
    } catch (error) {
      console.error("Erreur lors de la récupération des affectations", error);
    }
  }, [startDate, endDate]);

  const fetchDoctorsAndPatients = useCallback(async () => {
    try {
      const doctorsResponse = await doctorService.getAllDoctors();
      setDoctors(doctorsResponse.data);
      const patientsResponse = await patientService.getAllPatients();
      setPatients(patientsResponse.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des médecins ou des patients.",
        error
      );
    }
  }, []);

  useEffect(() => {
    fetchAssignments();
    fetchDoctorsAndPatients();
  }, [fetchAssignments, fetchDoctorsAndPatients]);

  const findClosestAssignments = async (e) => {
    e.preventDefault();
    const selectedDate = dayjs(assignmentDate);
    const startDate = selectedDate
      .subtract(2, "day")
      .format("YYYY-MM-DDTHH:mm");
    const endDate = selectedDate.add(2, "day").format("YYYY-MM-DDTHH:mm");

    let closestBefore = null;
    let closestAfter = null;
    let closestBeforeOtherRoomP = null;
    let closestBeforeOtherRoomD = null;
    let closestAfterOtherRoomP = null;
    let closestAfterOtherRoomD = null;

    try {
      const responseP = await patientService.getAllPatients();
      const assignmentsArray = responseP.data.flatMap((patient) =>
        patient.roomAssignments
          .filter((assignment) =>
            dayjs(assignment.assignmentDateTime).isBetween(startDate, endDate)
          )
          .map((assignment) => ({ ...assignment, patient }))
      );
      console.table(assignmentsArray);
      assignmentsArray.forEach((assignment) => {
        const assignmentDateTime = dayjs(assignment.assignmentDateTime);
        if (assignment.roomType === "BLOC_RYTHMOLOGIE") {
          if (assignmentDateTime.isBefore(selectedDate)) {
            if (
              !closestBefore ||
              assignmentDateTime.isAfter(
                dayjs(closestBefore.assignmentDateTime)
              )
            ) {
              closestBefore = assignment;
            }
          } else if (assignmentDateTime.isSameOrAfter(selectedDate)) {
            if (
              !closestAfter ||
              assignmentDateTime.isBefore(
                dayjs(closestAfter.assignmentDateTime)
              )
            ) {
              closestAfter = assignment;
            }
          }
        }
        if (
          assignment.roomType !== "BLOC_RYTHMOLOGIE" &&
          assignment.patient.id == patient.id
        ) {
          if (assignmentDateTime.isBefore(selectedDate)) {
            if (
              !closestBeforeOtherRoomP ||
              assignmentDateTime.isAfter(
                dayjs(closestBeforeOtherRoomP.assignmentDateTime)
              )
            ) {
              closestBeforeOtherRoomP = assignment;
            }
          } else if (assignmentDateTime.isSameOrAfter(selectedDate)) {
            if (
              !closestAfterOtherRoomP ||
              assignmentDateTime.isBefore(
                dayjs(closestAfterOtherRoomP.assignmentDateTime)
              )
            ) {
              closestAfterOtherRoomP = assignment;
            }
          }
        }
        if (
          assignment.roomType !== "BLOC_RYTHMOLOGIE" &&
          assignment.doctor.id == doctor.id
        ) {
          if (assignmentDateTime.isBefore(selectedDate)) {
            if (
              !closestBeforeOtherRoomD ||
              assignmentDateTime.isAfter(
                dayjs(closestBeforeOtherRoomD.assignmentDateTime)
              )
            ) {
              closestBeforeOtherRoomD = assignment;
            }
          } else if (assignmentDateTime.isSameOrAfter(selectedDate)) {
            if (
              !closestAfterOtherRoomD ||
              assignmentDateTime.isBefore(
                dayjs(closestAfterOtherRoomD.assignmentDateTime)
              )
            ) {
              closestAfterOtherRoomD = assignment;
            }
          }
        }
      });

      setClosestAssignments({
        before: closestBefore,
        after: closestAfter,
        beforeP: closestBeforeOtherRoomP,
        beforeD: closestBeforeOtherRoomD,
        afterP: closestAfterOtherRoomP,
        afterD: closestAfterOtherRoomD,
      });
      setIsModalVisible(true);
    } catch (error) {
      console.error("Erreur lors de la récupération des affectations", error);
    }
  };

  const addAssignment = async () => {
    try {
      const assignmentData = {
        roomType: "BLOC_RYTHMOLOGIE",
        assignmentDateTime: assignmentDate,
      };
      await patientService.addAssignment(doctor.id, patient.id, assignmentData);
      toast.success("Affectation ajoutée avec succès !");
      fetchAssignments();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Échec de l'ajout de l'affectation", error);
      toast.error("Échec de l'ajout de l'affectation");
    }
  };

  const handleDeleteAssignment = async () => {
    try {
      await patientService.deleteAssignment(deleteAssignmentId);
      toast.success("Affectation supprimée avec succès !");
      fetchAssignments();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'affectation", error);
      toast.error("Erreur lors de la suppression de l'affectation");
    }
    setIsDeleteModalAssignmentOpen(false);
  };

  const filteredAssignments = assignments.filter(
    (assignment) => assignment.roomType === "BLOC_RYTHMOLOGIE"
  );

  return (
    <div className="flex flex-col items-center p-4">
      <HeaderAgenda />
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold mt-4">Bloc de Rythmologie</span>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-[#8f8df2] text-white py-2 px-4 rounded-md mt-4 ml-32 transition duration-300 ease-in-out transform hover:bg-[#7f7de2] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7f7de2] focus:ring-opacity-75 active:bg-[#7f7de2]"
        >
          <FontAwesomeIcon
            icon={isFormVisible ? faMinus : faPlus}
            className="mr-2"
          />
          {isFormVisible ? "Masquer le formulaire" : "Ajouter une affectation"}{" "}
        </button>
      </div>
      {isFormVisible && (
        <form
          onSubmit={findClosestAssignments}
          className="bg-white shadow-md rounded-lg p-6 max-w-6xl mt-4 flex flex-col items-center space-y-4"
        >
          <div className="flex flex-wrap justify-center space-x-4">
            <select
              value={doctor ? doctor.id : ""}
              onChange={handleDoctorChange}
              required
              className="border border-gray-300 p-2 rounded-md max-w-md"
            >
              <option value="" disabled>
                ⚕️Choisir un Médecin
              </option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.prenom} {doctor.nom} - {doctor.specialty}
                </option>
              ))}
            </select>
            <select
              value={patient ? patient.id : ""}
              onChange={handlePatientChange}
              required
              className="border border-gray-300 p-2 rounded-md max-w-md"
            >
              <option value="" disabled>
                👤Choisir un Patient
              </option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.prenom} {patient.nom} {patient.referenceID}
                </option>
              ))}
            </select>
            <input
              type="datetime-local"
              placeholder="Assignment Date"
              value={assignmentDate}
              required
              onChange={(e) => setAssignmentDate(e.target.value)}
              className="border border-gray-300 p-2 rounded-md max-w-md"
            />
            <button
              type="submit"
              className="bg-[#8f8df2] hover:bg-[#7f7de2] text-white py-2 px-4 rounded-md"
            >
              Vérifier affectation
            </button>
          </div>
        </form>
      )}
      <div className="bg-white shadow-md rounded-lg  p-6 w-full max-w-6xl mt-4 flex flex-col space-y-4">
        <div className="flex space-x-4 justify-around">
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>

        {filteredAssignments.length > 0 && (
          <div className="mt-4 w-full">
            <table className="w-full bg-white border ">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="py-2 px-4 border">Date</th>
                  <th className="py-2 px-4 border">Médecin</th>
                  <th className="py-2 px-4 border">Patient</th>
                  <th className="py-2 px-4 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment, index) => (
                  <tr
                    key={assignment.id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                  >
                    <td className="py-2 px-4 border">
                      {formatDateWithCapitalizedDay(
                        assignment.assignmentDateTime
                      ) + "H"}
                    </td>
                    <td className="py-2 px-4 border">
                      <div className="font-semibold">
                        {assignment.doctor.prenom} {assignment.doctor.nom}
                      </div>
                      <div className="text-sm text-gray-500">
                        Spé : {assignment.doctor.specialty}
                        {" - "}
                        Tél : {assignment.doctor.phoneNumber}
                      </div>
                    </td>
                    <td className="py-2 px-4 border">
                      <div className="font-semibold">
                        {assignment.patient.prenom} {assignment.patient.nom}
                      </div>
                      <div className="text-sm text-gray-500">
                        Âge: {assignment.patient.age}
                        {" - "}
                        Ville: {assignment.patient.ville}
                        {" - "}
                        Profession: {assignment.patient.profession}
                      </div>
                    </td>
                    <td className="py-2 px-4 border text-center">
                      <button
                        onClick={() => {
                          setDeleteAssignmentId(assignment.id);
                          setIsDeleteModalAssignmentOpen(true);
                        }}
                        className=" text-red-500 py-1 px-3 hover:text-red-600"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Vérification des Affectations autour la date:
            </h2>
            <div className="text-lg mb-4 text-center space-y-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-evenly space-y-4 md:space-y-0">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-yellow-500" />
                  <span className="font-bold ml-1">
                    {formatDateWithCapitalizedDay(assignmentDate)}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaUserMd className="mr-2 text-blue-500" />
                  <span className="font-bold ml-1">
                    {doctor.prenom} {doctor.nom}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaUser className="mr-2 text-green-500" />
                  <span className="font-bold ml-1">
                    {patient.prenom} {patient.nom}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                {closestAssignments.before && (
                  <AssignmentCard
                    title="Affectation Précédente en Salle Cathétérisme"
                    assignment={closestAssignments.before}
                    assignmentDate={assignmentDate}
                    type="bloc de rythmologie"
                  />
                )}
                {!closestAssignments.before && (
                  <AssignmentCardNotFound
                    title="Affectation Précédente"
                    type="bloc de rythmologie"
                  />
                )}
                {closestAssignments.beforeD && (
                  <AssignmentCard
                    title="Affectation Précédente pour le Médecin"
                    assignment={closestAssignments.beforeD}
                    assignmentDate={assignmentDate}
                    type="salle de cathétérisme"
                  />
                )}
                {!closestAssignments.beforeD && (
                  <AssignmentCardNotFound
                    title="Affectation Précédente pour le Médecin"
                    type="salle de cathétérisme"
                  />
                )}
                {closestAssignments.beforeP && (
                  <AssignmentCard
                    title="Affectation Précédente pour le Patient"
                    assignment={closestAssignments.beforeP}
                    assignmentDate={assignmentDate}
                    type="salle de cathétérisme"
                  />
                )}
                {!closestAssignments.beforeP && (
                  <AssignmentCardNotFound
                    title="Affectation Précédente pour le Patient"
                    type="salle de cathétérisme"
                  />
                )}
              </div>
              <div>
                {closestAssignments.after && (
                  <AssignmentCard
                    title="Affectation Suivante"
                    assignment={closestAssignments.after}
                    assignmentDate={assignmentDate}
                    type="bloc de rythmologie"
                  />
                )}
                {!closestAssignments.after && (
                  <AssignmentCardNotFound
                    title="Affectation Suivante"
                    type="bloc de rythmologie"
                  />
                )}
                {closestAssignments.afterD && (
                  <AssignmentCard
                    title="Affectation Suivante pour le Médecin"
                    assignment={closestAssignments.afterD}
                    assignmentDate={assignmentDate}
                    type="salle de cathétérisme"
                  />
                )}
                {!closestAssignments.afterD && (
                  <AssignmentCardNotFound
                    title="Affectation Suivante pour le Médecin"
                    type="salle de cathétérisme"
                  />
                )}
                {closestAssignments.afterP && (
                  <AssignmentCard
                    title="Affectation Suivante pour le Patient"
                    assignment={closestAssignments.afterP}
                    assignmentDate={assignmentDate}
                    type="salle de cathétérisme"
                  />
                )}
                {!closestAssignments.afterP && (
                  <AssignmentCardNotFound
                    title="Affectation Suivante pour le Patient"
                    type="salle de cathétérisme"
                  />
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-8 mt-4 text-center">
              <button
                onClick={addAssignment}
                className="bg-[#8f8df2] hover:bg-[#7f7de2] text-white font-bold py-2 px-8 rounded-lg"
              >
                Confirmer
              </button>
              <button
                onClick={() => setIsModalVisible(false)}
                className="bg-white hover:bg-[#cacdf2] border-[#8f8dff] hover:border-[#cfcdff] border text-[#8f8df2] hover:text-white font-bold py-2 px-8 rounded-lg"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
      <ModalDeleteAssignment
        isOpen={isDeleteModalAssignmentOpen}
        onRequestClose={() => setIsDeleteModalAssignmentOpen(false)}
        handleDelete={handleDeleteAssignment}
        message="supprimer assignment de salle"
      />
      <ToastContainer
        draggable
        closeOnClick
        position="bottom-right"
        autoClose={5000}
      />{" "}
    </div>
  );
};

export default BlocRythmologie;
