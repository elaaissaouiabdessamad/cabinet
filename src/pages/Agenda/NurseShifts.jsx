import React, { useState, useEffect } from "react";
import NurseService from "../../services/nurse.service";
import HeaderAgenda from "../../components/HeaderAgenda";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NurseShifts = () => {
  const [shifts, setShifts] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
      toast.error("Veuillez fournir les dates de début et de fin.");
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

  const handleGenerateShifts = () => {
    if (!startDate || !endDate) {
      toast.error("Veuillez fournir les dates de début et de fin.");
      return;
    }
    setLoading(true);
    NurseService.generateShifts(startDate, endDate, shiftType)
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
      <div className="flex flex-col space-y-4 mt-8 w-full max-w-5xl">
        <form onSubmit={handleSubmit} className="flex space-x-4 mb-4">
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
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Jour
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nuit
                </th>
              </tr>
            </thead>
            <tbody>
              {dateRange.map((date) => (
                <tr key={date}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {getNurseShift(date, "jour").length > 0
                      ? getNurseShift(date, "jour").map((shift) => (
                          <div
                            key={shift.nurse.id}
                            className="flex items-center justify-center"
                          >
                            {shift.nurse.prenom + " " + shift.nurse.nom}
                            <button
                              onClick={() => handleUpdateShift(shift)}
                              className="ml-2 text-blue-500 hover:text-blue-700"
                            >
                              Modifier infirmière
                            </button>
                            <button
                              onClick={() => handleDeleteShift(shift)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              Retirer
                            </button>
                          </div>
                        ))
                      : ""}
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleAddShift(date, "jour")}
                        className="text-green-500 hover:text-green-700"
                      >
                        Ajouter
                      </button>
                    </div>
                  </td>
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
                              Modifier infirmière
                            </button>
                            <button
                              onClick={() => handleDeleteShift(shift)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              Retirer
                            </button>
                          </div>
                        ))
                      : ""}
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleAddShift(date, "nuit")}
                        className="text-green-500 hover:text-green-700"
                      >
                        Ajouter
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-2 mt-4">
          <span className="text-lg font-bold">Infirmières</span>
          <button
            type="button"
            onClick={() => setIsNurseFormVisible(!isNurseFormVisible)}
            className="bg-blue-500 ml-8 text-white py-2 px-4 rounded-md"
          >
            {isNurseFormVisible ? "Annuler" : "Ajouter une infirmière"}
          </button>
          {isNurseFormVisible && (
            <form
              onSubmit={handleNurseSubmit}
              className="flex flex-col space-y-4"
            >
              <input
                required
                type="text"
                name="nom"
                value={nurse.nom}
                onChange={handleNurseChange}
                placeholder="Prénom"
                className="border p-2 rounded-md"
              />
              <input
                required
                type="text"
                name="prenom"
                value={nurse.prenom}
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
            </form>
          )}
          {nurses.map((nurse) => (
            <div
              key={nurse.id}
              className="p-4 bg-gray-100 rounded-md shadow-md"
            >
              <p>
                <strong>Nom complet:</strong> {nurse.nom} {nurse.prenom}
              </p>
              <p>
                <strong>Spécialité:</strong> {nurse.specialty}
              </p>
              <p>
                <strong>Numéro de téléphone:</strong> {nurse.phoneNumber}
              </p>
            </div>
          ))}
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
                          {nurses.map((nurse) => (
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
                          {nurses.map((nurse) => (
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
                          Êtes-vous sûr de vouloir supprimer cette horaire ?
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
    </div>
  );
};

export default NurseShifts;
