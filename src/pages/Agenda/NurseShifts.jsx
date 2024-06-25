import React, { useState, useEffect } from "react";
import NurseService from "../../services/nurse.service";
import HeaderAgenda from "../../components/HeaderAgenda";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faEdit,
  faTrash,
  faSyncAlt,
  faTrashAlt,
  faCheck,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

const NurseShifts = () => {
  const [shifts, setShifts] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(
    dayjs().add(6, "day").format("YYYY-MM-DD")
  );
  const [shiftType, setShiftType] = useState("");
  const [nurse, setNurse] = useState({
    nom: "",
    prenom: "",
    specialty: "",
    phoneNumber: "",
  });
  const [isNurseFormVisible, setIsNurseFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedShiftNotAdded, setSelectedShiftNotAdded] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (startDate && endDate) {
      fetchShifts();
    }
    fetchNurses();
  }, [startDate, endDate, shiftType]);

  const fetchShifts = () => {
    if (!startDate || !endDate) {
      toast.error(
        "Veuillez fournir à la fois une date de début et une date de fin pour récupérer les horaires."
      );
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("La date de début doit être antérieure à la date de fin.");
      return;
    }
    NurseService.getNurseShifts(startDate, endDate, shiftType).then(
      (response) => {
        setShifts(response.data);
      }
    );
  };

  const fetchNurses = () => {
    NurseService.getAllNurses().then((response) => {
      setNurses(response.data);
    });
  };

  const handleMode = () => {
    setIsEdit(!isEdit);
  };

  const handleGenerateShifts = () => {
    if (!startDate || !endDate) {
      toast.error(
        "Veuillez fournir à la fois une date de début et une date de fin pour générer les horaires."
      );
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("La date de début doit être antérieure à la date de fin.");
      return;
    }
    if (nurses.length <= 1) {
      toast.error("Veuillez fournir au moins deux infirmières.");
      return;
    }
    setLoading(true);
    NurseService.generateShifts(startDate, endDate)
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

  const handleDeleteShifts = () => {
    if (!startDate || !endDate) {
      toast.error(
        "Veuillez fournir à la fois une date de début et une date de fin pour supprimer les horaires."
      );
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("La date de début doit être antérieure à la date de fin.");
      return;
    }
    setLoading(true);
    NurseService.deleteShifts(startDate, endDate)
      .then(() => {
        fetchShifts();
        toast.success("Les gardes ont été supprimées avec succès !");
      })
      .catch(() => {
        toast.error("Échec de la suppression des gardes. Veuillez réessayer.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchShifts();
  };

  const handleNurseChange = (e) => {
    const { name, value } = e.target;
    setNurse({ ...nurse, [name]: value });
  };

  const handleNurseSubmit = (e) => {
    e.preventDefault();
    NurseService.createNurse(nurse)
      .then(() => {
        toast.success("Infirmière ajoutée avec succès !");
        fetchNurses();
        setNurse({ nom: "", prenom: "", specialty: "", phoneNumber: "" });
        setIsNurseFormVisible(false);
      })
      .catch(() => {
        toast.error("Échec de l'ajout de l'infirmière. Veuillez réessayer.");
      });
  };

  const getNurseShift = (date, shiftType) => {
    return shifts.filter(
      (s) => s.shiftDate === date && s.shiftType === shiftType
    );
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
    NurseService.addShift(
      selectedShiftNotAdded.shiftDate,
      selectedShiftNotAdded.shiftType,
      selectedShiftNotAdded.nurseId
    )
      .then(() => {
        toast.success("Garde ajoutée avec succès !");
        setShowAddModal(false);
        fetchShifts();
      })
      .catch(() => {
        toast.error("Échec de l'ajout de la garde. Veuillez réessayer.");
      });
  };

  const updateShift = () => {
    NurseService.updateShift(selectedShift.id, selectedShift.nurseId)
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
    NurseService.deleteShift(selectedShift.id)
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
        <span className="text-2xl font-bold">Infirmières responsables</span>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <p
          className={`text-sm mt-1 px-4 py-1 rounded-md cursor-pointer transition duration-300 flex items-center ${
            isEdit
              ? "text-white bg-blue-500 hover:bg-blue-600"
              : "border border-blue-500 text-blue-500 bg-white hover:bg-blue-100"
          }`}
          onClick={handleMode}
        >
          {isEdit ? (
            <>
              <FontAwesomeIcon icon={faEye} className="mr-2" />
              Mode lecture
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Mode mise à jour
            </>
          )}
        </p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-5xl mt-4 flex flex-col space-y-4">
        <form onSubmit={handleSubmit} className="flex justify-evenly space-x-4">
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
          {isEdit ? (
            <>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                data-tip
                data-for="fetchNurseShiftsTip"
              >
                <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
                Récupérer
              </button>
              <ReactTooltip id="fetchNurseShiftsTip" place="top" effect="solid">
                Veuillez fournir à la fois une date de début, une date de fin
                <br />
                et le type de garde pour récupérer les horaires.{" "}
              </ReactTooltip>
              <button
                type="button"
                onClick={handleGenerateShifts}
                className="bg-green-500 text-white py-2 px-4 rounded-md"
                disabled={loading}
                data-tip
                data-for="generateNurseShiftsTip"
              >
                <FontAwesomeIcon icon={faCheck} className="mr-2" />
                Générer
              </button>
              <ReactTooltip
                id="generateNurseShiftsTip"
                place="top"
                effect="solid"
              >
                Cliquez ici pour générer de nouveaux horaires
                <br />
                pour les infirmières après avoir fourni les dates.
              </ReactTooltip>
              <button
                type="button"
                onClick={handleDeleteShifts}
                className="bg-red-500 text-white py-2 px-4 rounded-md"
                disabled={loading}
                data-tip
                data-for="deleteNurseShiftsTip"
              >
                <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                Supprimer
              </button>
              <ReactTooltip
                id="deleteNurseShiftsTip"
                place="top"
                effect="solid"
              >
                Cliquez ici pour supprimer de nouveaux horaires
                <br />
                pour les infirmières après avoir fourni les dates.
              </ReactTooltip>
            </>
          ) : (
            ""
          )}
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
                        {getNurseShift(date, "jour").length > 0
                          ? getNurseShift(date, "jour").map((shift) => (
                              <div
                                key={shift.nurse.id}
                                className="flex items-center justify-center"
                              >
                                {shift.nurse.prenom + " " + shift.nurse.nom}
                                {isEdit ? (
                                  <>
                                    <button
                                      onClick={() => handleUpdateShift(shift)}
                                      className="ml-2 text-blue-500 hover:text-blue-700"
                                    >
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        className="mr-1"
                                      />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteShift(shift)}
                                      className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        className="mr-1"
                                      />
                                    </button>
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                            ))
                          : ""}
                        {isEdit ? (
                          <>
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => handleAddShift(date, "jour")}
                                className="text-green-500 hover:text-green-700"
                              >
                                <FontAwesomeIcon
                                  icon={faPlus}
                                  className="mr-1"
                                />
                              </button>
                            </div>
                          </>
                        ) : getNurseShift(date, "jour").length > 0 ? (
                          ""
                        ) : (
                          "-"
                        )}
                      </td>
                    ) : (
                      ""
                    )}
                    {shiftType === "nuit" || shiftType === "" ? (
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {getNurseShift(date, "nuit").length > 0
                          ? getNurseShift(date, "nuit").map((shift) => (
                              <div
                                key={shift.nurse.id}
                                className="flex items-center justify-center"
                              >
                                {shift.nurse.prenom + " " + shift.nurse.nom}
                                <button
                                  onClick={() => handleUpdateShift(shift)}
                                  className="ml-2 text-blue-500 hover:text-blue-700"
                                >
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    className="mr-1"
                                  />{" "}
                                </button>
                                <button
                                  onClick={() => handleDeleteShift(shift)}
                                  className="ml-2 text-red-500 hover:text-red-700"
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="mr-1"
                                  />{" "}
                                </button>
                              </div>
                            ))
                          : ""}

                        {isEdit ? (
                          <>
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => handleAddShift(date, "nuit")}
                                className="text-green-500 hover:text-green-700"
                              >
                                <FontAwesomeIcon
                                  icon={faPlus}
                                  className="mr-1"
                                />
                              </button>
                            </div>
                          </>
                        ) : (
                          "-"
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
        <span className="text-lg font-bold">Infirmières</span>
        {isEdit ? (
          <>
            <button
              type="button"
              onClick={() => setIsNurseFormVisible(!isNurseFormVisible)}
              className="bg-blue-500 ml-8 text-white py-2 px-4 rounded-md"
            >
              <FontAwesomeIcon
                icon={isNurseFormVisible ? faMinus : faPlus}
                className="mr-2"
              />
              {isNurseFormVisible
                ? "Masquer le formulaire"
                : "Ajouter une infirmière"}
            </button>
          </>
        ) : (
          ""
        )}
        {isNurseFormVisible && isEdit && (
          <form
            onSubmit={handleNurseSubmit}
            className="flex flex-col space-y-4 mt-4"
          >
            <input
              required
              type="text"
              name="prenom"
              value={nurse.prenom}
              onChange={handleNurseChange}
              placeholder="Prénom"
              className="border p-2 rounded-md"
            />
            <input
              required
              type="text"
              name="nom"
              value={nurse.nom}
              onChange={handleNurseChange}
              placeholder="Nom"
              className="border p-2 rounded-md"
            />
            <input
              required
              type="text"
              name="specialty"
              value={nurse.specialty}
              onChange={handleNurseChange}
              placeholder="Spécialité"
              className="border p-2 rounded-md"
            />
            <input
              required
              type="text"
              name="phoneNumber"
              value={nurse.phoneNumber}
              onChange={handleNurseChange}
              placeholder="Numéro de téléphone"
              className="border p-2 rounded-md"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Ajouter une infirmière
            </button>
            <hr />
          </form>
        )}

        {nurses.length > 0 ? (
          <div className="space-y-2 mt-4">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Spécialité
                    </th>
                    <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Numéro de téléphone
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nurses.map((nurse, index) => (
                    <tr
                      key={nurse.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-100"
                      } border-b`}
                    >
                      <td className="px-4 py-2">
                        {nurse.prenom} {nurse.nom}
                      </td>
                      <td className="px-4 py-2">{nurse.specialty}</td>
                      <td className="px-4 py-2">{nurse.phoneNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {showAddModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
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
                        value={selectedShiftNotAdded.nurseId}
                        onChange={(e) =>
                          setSelectedShiftNotAdded({
                            ...selectedShiftNotAdded,
                            nurseId: e.target.value,
                          })
                        }
                        className="border p-2 rounded-md w-full"
                      >
                        <option value="">Sélectionner une infirmière</option>
                        {nurses
                          .filter((nurse) => {
                            return !shifts.some(
                              (shift) =>
                                shift.shiftDate ===
                                  selectedShiftNotAdded.shiftDate &&
                                shift.shiftType ===
                                  selectedShiftNotAdded.shiftType &&
                                shift.nurse.id === nurse.id
                            );
                          })
                          .map((nurse) => (
                            <option key={nurse.id} value={nurse.id}>
                              {nurse.prenom} {nurse.nom}
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
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
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
                      Mettre à jour l'horaire
                    </h3>
                    <div className="mt-2">
                      <select
                        value={selectedShift.nurseId}
                        onChange={(e) =>
                          setSelectedShift({
                            ...selectedShift,
                            nurseId: e.target.value,
                          })
                        }
                        className="border p-2 rounded-md w-full"
                      >
                        <option value="">Sélectionner une infirmière</option>
                        {nurses
                          .filter((nurse) => {
                            return !shifts.some(
                              (shift) =>
                                shift.shiftDate === selectedShift.shiftDate &&
                                shift.shiftType === selectedShift.shiftType &&
                                shift.nurse.id === nurse.id
                            );
                          })
                          .map((nurse) => (
                            <option key={nurse.id} value={nurse.id}>
                              {nurse.prenom} {nurse.nom}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={updateShift}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Mettre à jour
                </button>
                <button
                  onClick={() => setShowUpdateModal(false)}
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
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
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
                      Supprimer l'horaire
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Êtes-vous sûr de vouloir supprimer l'horaire pour{" "}
                        {selectedShift.nurse.prenom} {selectedShift.nurse.nom}{" "}
                        le {selectedShift.shiftDate} pour le quart de travail{" "}
                        {selectedShift.shiftType} ?{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => deleteShift(selectedShift)}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Supprimer
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
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
    </div>
  );
};

export default NurseShifts;
