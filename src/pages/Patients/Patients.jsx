import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BedService from "../../services/bed.service";
import moment from "moment";
import ModalDeleteBed from "../../components/ModalDelete";
import ModalDeleteAssignment from "../../components/ModalUnAffectation";

const Patients = () => {
  const { sectorId } = useParams();
  const [beds, setBeds] = useState([]);
  const [isDeleteModalBedOpen, setIsDeleteModalBedOpen] = useState(false);
  const [deleteBedId, setDeleteBedId] = useState(null);
  const [deleteAssignmentByBedId, setDeleteAssignmentByBedId] = useState(null);
  const [isDeleteModalAssignmentOpen, setIsDeleteModalAssignmentOpen] =
    useState(false);

  useEffect(() => {
    const fetchBeds = async () => {
      try {
        const response = await BedService.getBedsBySectorId(sectorId);
        setBeds(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des lits:", error);
      }
    };

    if (sectorId) {
      fetchBeds();
    }
  }, [sectorId]);

  const handleAddBed = async () => {
    try {
      await BedService.addBedBySectorId(sectorId);
      const response = await BedService.getBedsBySectorId(sectorId);
      setBeds(response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout du lit:", error);
    }
  };

  const handleRemovePatient = async () => {
    try {
      await BedService.removePatientToBed(deleteAssignmentByBedId);
      const response = await BedService.getBedsBySectorId(sectorId);
      setBeds(response.data);
    } catch (error) {
      console.error("Erreur lors du retrait du patient du lit:", error);
    }
    setIsDeleteModalAssignmentOpen(false);
  };

  const handleDeleteBed = async () => {
    try {
      await BedService.deleteBedById(deleteBedId);
      setBeds(beds.filter((bed) => bed.id !== deleteBedId));
    } catch (error) {
      console.error("Erreur lors de la suppression du lit:", error);
    }
    setIsDeleteModalBedOpen(false);
  };

  const getColorClass = (bed) => {
    if (bed.state === "EMPTY") {
      return "border-blue-500 text-blue-500";
    }
    const daysOccupied = moment().diff(moment(bed.startDateTime), "days");
    if (daysOccupied < 10) {
      return "border-green-500 text-green-500";
    }
    return "border-red-500 text-red-500";
  };

  const calculateDaysOccupied = (startDateTime) => {
    const daysOccupied = moment().diff(moment(startDateTime), "days");
    return daysOccupied;
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <div className="flex items-center w-full">
          <input
            type="text"
            placeholder="Rechercher..."
            className="flex-grow p-2 border rounded-lg"
          />
          <button className="ml-2 p-2 bg-white border rounded-lg">
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
      <div className="grid grid-cols-3 gap-6">
        {beds.map((bed) => (
          <div key={bed.id} className="relative">
            <div
              className={`p-4 border-2 rounded-lg shadow-md ${
                getColorClass(bed).split(" ")[0]
              }`}
            >
              <button
                onClick={() => {
                  setDeleteBedId(bed.id);
                  setIsDeleteModalBedOpen(true);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 align-center text-center flex items-center justify-center rounded-full hover:bg-red-600 transition duration-200 z-10"
              >
                <i className="fas fa-trash-alt"></i>
              </button>
              <Link to={`/beds/${bed.id}`} className="no-underline">
                <h3
                  className={`text-lg font-semibold ${
                    getColorClass(bed).split(" ")[1]
                  }`}
                >
                  Lit {bed.id}
                </h3>
              </Link>
              {bed.state === "OCCUPIED" ? (
                <>
                  <p className={`${getColorClass(bed).split(" ")[1]} mt-2`}>
                    {bed.currentPatient
                      ? `${bed.currentPatient.prenom} ${bed.currentPatient.nom}`
                      : "Inconnu"}
                  </p>
                  <p className={`${getColorClass(bed).split(" ")[1]}`}>
                    {calculateDaysOccupied(bed.startDateTime) > 0
                      ? `Jours Occupés: ${calculateDaysOccupied(
                          bed.startDateTime
                        )} ${
                          calculateDaysOccupied(bed.startDateTime) > 1
                            ? "jours"
                            : "jour"
                        }`
                      : "Occupé aujourd'hui"}
                  </p>
                  <div className="flex justify-between">
                    <div>
                      <button
                        onClick={() => {
                          setDeleteAssignmentByBedId(bed.id);
                          setIsDeleteModalAssignmentOpen(true);
                        }}
                        className="mt-2 p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200"
                      >
                        <i className="fas fa-user-minus mr-1"></i> Retirer
                        l’affectation
                      </button>
                    </div>
                    <div className="ml-4 text-right">
                      <p className={`${getColorClass(bed).split(" ")[1]}`}>
                        {bed.assignedDoctor
                          ? "Dr. " + bed.assignedDoctor.nom
                          : "Inconnu"}
                      </p>
                      <p className={`${getColorClass(bed).split(" ")[1]}`}>
                        {bed.assignedDoctor
                          ? bed.assignedDoctor.phoneNumber
                          : "Inconnu"}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-blue-500 mt-2 mb-6">LIBRE</p>
              )}
            </div>
          </div>
        ))}
        <div className="relative p-4 min-h-28 border-2 rounded-lg shadow-md border-dashed flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-200">
          <button onClick={handleAddBed}>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
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
            </div>
          </button>
        </div>
      </div>
      <ModalDeleteBed
        isOpen={isDeleteModalBedOpen}
        onRequestClose={() => setIsDeleteModalBedOpen(false)}
        handleDelete={handleDeleteBed}
        message="supprimer lit"
      />
      <ModalDeleteAssignment
        isOpen={isDeleteModalAssignmentOpen}
        onRequestClose={() => setIsDeleteModalAssignmentOpen(false)}
        handleDelete={handleRemovePatient}
        message="retirer l’affectation"
      />
    </div>
  );
};

export default Patients;
