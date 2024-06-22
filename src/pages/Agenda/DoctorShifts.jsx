import React, { useState, useEffect } from "react";
import DoctorService from "../../services/doctor.service";
import HeaderAgenda from "../../components/HeaderAgenda";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const DoctorShifts = () => {
  const [shifts, setShifts] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [shiftType, setShiftType] = useState("");
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState({
    nom: "",
    prenom: "",
    specialty: "",
    phoneNumber: "",
  });
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedShiftNotAdded, setSelectedShiftNotAdded] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (startDate && endDate) {
      fetchShifts();
    }
    fetchDoctors();
  }, [startDate, endDate, shiftType]);

  const fetchShifts = () => {
    if (!startDate || !endDate) {
      toast.error("Veuillez fournir les dates de début et de fin.");
      return;
    }
    DoctorService.getDoctorGuards(startDate, endDate, shiftType).then(
      (response) => {
        setShifts(response.data);
      }
    );
  };

  const fetchDoctors = () => {
    DoctorService.getAllDoctors().then((response) => {
      setDoctors(response.data);
    });
  };

  const handleGenerateShifts = () => {
    if (!startDate || !endDate) {
      toast.error("Veuillez fournir les dates de début et de fin.");
      return;
    }
    setLoading(true);
    DoctorService.generateShifts(startDate, endDate, shiftType)
      .then(() => {
        fetchShifts();
        toast.success("Les gardes ont été générées avec succès !");
      })
      .catch(() => {
        toast.error("Échec de la génération des gardes. Veuillez réessayer.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchShifts();
  };

  const handleDoctorChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    DoctorService.createDoctor(doctor)
      .then(() => {
        toast.success("Docteur ajouté avec succès !");
        fetchDoctors();
        setDoctor({ nom: "", prenom: "", specialty: "", phoneNumber: "" });
        setShowDoctorForm(false);
      })
      .catch(() => {
        toast.error("Échec de l'ajout du docteur. Veuillez réessayer.");
      });
  };

  const getDoctorShift = (date, shiftType) => {
    const shift = shifts.find(
      (s) => s.shiftDate === date && s.shiftType === shiftType
    );
    return shift ? shift : "";
  };

  const generateDateRange = (start, end) => {
    const dates = [];
    let currentDate = new Date(start);
    const endDate = new Date(end);

    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const dateRange = generateDateRange(startDate, endDate);

  const handleUpdateShift = (shift) => {
    setSelectedShift(shift);
    setShowUpdateModal(true);
  };

  const handleDeleteShift = (shift) => {
    setSelectedShift(shift);
    setShowDeleteModal(true);
  };

  const handleAddShift = (shiftDate, shiftType) => {
    setSelectedShiftNotAdded({ shiftDate, shiftType });
    setShowAddModal(true);
  };

  const addShift = () => {
    console.log(selectedShiftNotAdded);
    DoctorService.addShift(
      selectedShiftNotAdded.shiftDate,
      selectedShiftNotAdded.shiftType,
      selectedShiftNotAdded.doctorId
    )
      .then(() => {
        toast.success("Garde ajouté avec succès !");
        setShowUpdateModal(false);
        fetchShifts();
      })
      .catch(() => {
        toast.error("Échec de l'ajout de la garde. Veuillez réessayer.");
      });
  };

  const updateShift = () => {
    console.log("id 1: " + selectedShift.doctorId);
    console.log("id 2: " + selectedShift.doctor.id);
    DoctorService.updateShift(selectedShift.id, selectedShift.doctorId)
      .then(() => {
        toast.success("Garde mise à jour avec succès !");
        setShowUpdateModal(false);
        fetchShifts();
      })
      .catch(() => {
        toast.error("Échec de la mise à jour de la garde. Veuillez réessayer.");
      });
  };

  const deleteShift = (selectedShift) => {
    DoctorService.deleteShift(selectedShift.id)
      .then(() => {
        toast.success("Garde supprimée avec succès !");
        fetchShifts();
        setShowDeleteModal(false);
      })
      .catch(() => {
        toast.error("Échec de la suppression de la garde. Veuillez réessayer.");
      });
  };

  return (
    <div className="flex m-4 flex-col items-center">
      <HeaderAgenda />
      <ToastContainer
        draggable
        closeOnClick
        position="bottom-right"
        autoClose={5000}
      />{" "}
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold mt-4">Garde des médecins</span>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-5xl mt-4 flex flex-col space-y-4">
        <form
          onSubmit={handleSubmit}
          className="flex justify-between space-x-4"
        >
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded-md"
          />
          <select
            value={shiftType}
            onChange={(e) => setShiftType(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="">Toutes les gardes</option>
            <option value="jour">Jour</option>
            <option value="nuit">Nuit</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Récupérer les horaires
          </button>
          <button
            type="button"
            onClick={handleGenerateShifts}
            className="bg-green-500 text-white py-2 px-4 rounded-md"
            disabled={loading}
          >
            {loading ? "Génération des horaires..." : "Générer les horaires"}
          </button>
        </form>
        {dateRange.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  {shiftType === "jour" || shiftType === "" ? (
                    <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Jour
                    </th>
                  ) : (
                    ""
                  )}
                  {shiftType === "nuit" || shiftType === "" ? (
                    <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Nuit
                    </th>
                  ) : (
                    ""
                  )}
                </tr>
              </thead>
              <tbody>
                {dateRange.map((date, index) => (
                  <tr
                    key={date}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {date}
                    </td>
                    {shiftType === "jour" || shiftType === "" ? (
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {getDoctorShift(date, "jour") ? (
                          <div className="flex items-center justify-center">
                            {getDoctorShift(date, "jour").doctor.prenom +
                              " " +
                              getDoctorShift(date, "jour").doctor.nom}
                            <button
                              onClick={() =>
                                handleUpdateShift(getDoctorShift(date, "jour"))
                              }
                              className="ml-2 text-blue-500 hover:text-blue-700"
                            >
                              <FontAwesomeIcon icon={faEdit} className="mr-1" />{" "}
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteShift(getDoctorShift(date, "jour"))
                              }
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="mr-1"
                              />{" "}
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            {" "}
                            <button
                              onClick={() => handleAddShift(date, "jour")}
                              className="text-green-500 hover:text-green-700"
                            >
                              <FontAwesomeIcon icon={faPlus} className="mr-1" />
                            </button>
                          </div>
                        )}
                      </td>
                    ) : (
                      ""
                    )}
                    {shiftType === "nuit" || shiftType === "" ? (
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {getDoctorShift(date, "nuit") ? (
                          <div className="flex items-center justify-center">
                            {getDoctorShift(date, "nuit").doctor.prenom +
                              " " +
                              getDoctorShift(date, "nuit").doctor.nom}
                            <button
                              onClick={() =>
                                handleUpdateShift(getDoctorShift(date, "nuit"))
                              }
                              className="ml-2 text-blue-500 hover:text-blue-700"
                            >
                              <FontAwesomeIcon icon={faEdit} className="mr-1" />{" "}
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteShift(getDoctorShift(date, "nuit"))
                              }
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="mr-1"
                              />{" "}
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            {" "}
                            <button
                              onClick={() => handleAddShift(date, "nuit")}
                              className="text-green-500 hover:text-green-700"
                            >
                              <FontAwesomeIcon icon={faPlus} className="mr-1" />
                            </button>
                          </div>
                        )}
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="bg-white shadow-md rounded-lg w-1/2 p-6 max-w-5xl mt-8">
        <span className="text-lg font-bold">Médecins</span>
        <button
          type="button"
          onClick={() => setShowDoctorForm(!showDoctorForm)}
          className="bg-blue-500 ml-8 text-white py-2 px-4 rounded-md"
        >
          <FontAwesomeIcon
            icon={showDoctorForm ? faMinus : faPlus}
            className="mr-2"
          />
          {showDoctorForm ? "Masquer le formulaire" : "Ajouter un médecin"}
        </button>
        {showDoctorForm && (
          <form
            onSubmit={handleDoctorSubmit}
            className="flex flex-col justify-between space-y-4 mt-4"
          >
            <input
              required
              type="text"
              name="nom"
              value={doctor.nom}
              onChange={handleDoctorChange}
              placeholder="Prénom"
              className="border p-2 rounded-md"
            />
            <input
              required
              type="text"
              name="prenom"
              value={doctor.prenom}
              onChange={handleDoctorChange}
              placeholder="Nom"
              className="border p-2 rounded-md"
            />
            <input
              required
              type="text"
              name="specialty"
              value={doctor.specialty}
              onChange={handleDoctorChange}
              placeholder="Spécialité"
              className="border p-2 rounded-md"
            />
            <input
              required
              type="text"
              name="phoneNumber"
              value={doctor.phoneNumber}
              onChange={handleDoctorChange}
              placeholder="Numéro de téléphone"
              className="border p-2 rounded-md"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Ajouter un médecin
            </button>
            <hr />
          </form>
        )}
        <div className="space-y-2 mt-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="p-4 bg-gray-100 rounded-md shadow-md"
            >
              <p>
                <strong>Nom:</strong> {doctor.nom} {doctor.prenom}
              </p>
              <p>
                <strong>Spécialité:</strong> {doctor.specialty}
              </p>
              <p>
                <strong>Numéro de téléphone:</strong> {doctor.phoneNumber}
              </p>
            </div>
          ))}
        </div>
      </div>
      {showAddModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Ajouter horaire
                    </h3>
                    <div className="mt-2">
                      <select
                        value={selectedShiftNotAdded.doctorId}
                        onChange={(e) =>
                          setSelectedShiftNotAdded({
                            ...selectedShiftNotAdded,
                            doctorId: e.target.value,
                          })
                        }
                        className="border p-2 rounded-md w-full mb-4"
                      >
                        <option value="">Sélectionner un médecin</option>
                        {doctors.map((doctor) => (
                          <option key={doctor.id} value={doctor.id}>
                            {doctor.prenom} {doctor.nom}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={addShift}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Ajouter
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showUpdateModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Mettre à jour l'horaire
                  </h3>
                  <div className="mt-2">
                    <select
                      value={selectedShift.doctorId}
                      onChange={(e) =>
                        setSelectedShift({
                          ...selectedShift,
                          doctorId: e.target.value,
                        })
                      }
                      className="border p-2 rounded-md"
                    >
                      <option value="">Sélectionner un médecin</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.prenom} {doctor.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  onClick={updateShift}
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                >
                  Mettre à jour
                </button>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="mt-3 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:text-sm"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Supprimer l'horaire
                  </h3>
                  <div className="mt-2">
                    <p>
                      Êtes-vous sûr de vouloir supprimer l'horaire pour{" "}
                      {selectedShift.doctor.firstName}{" "}
                      {selectedShift.doctor.lastName} le {selectedShift.date}{" "}
                      pour le quart de travail {selectedShift.shiftType} ?
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  onClick={() => deleteShift(selectedShift)}
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                >
                  Supprimer
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="mt-3 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:text-sm"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorShifts;
