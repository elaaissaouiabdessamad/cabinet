import React, { useState, useEffect } from "react";
import MedicineService from "../../services/medicine.service";
import AddMedicineForm from "./AddMedicineForm";
import DeleteConfirmation from "./DeleteConfirmation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faTrashAlt,
  faPlusCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Pharmacie = () => {
  const [medicines, setMedicines] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = () => {
    MedicineService.getMedicines().then((response) => {
      setMedicines(response.data);
    });
  };

  const addQuantity = (id) => {
    MedicineService.addQuantity(id, 1).then(() => {
      loadMedicines();
    });
  };

  const subtractQuantity = (id) => {
    MedicineService.subtractQuantity(id, 1)
      .then(() => {
        loadMedicines();
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        if (error.response && error.response.status === 400) {
          toast.error(resMessage);
        } else {
          console.error("Une erreur s'est produite:", error);
        }
      });
  };

  const handleDeleteClick = (medicine) => {
    setMedicineToDelete(medicine);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    MedicineService.deleteMedicine(medicineToDelete.id).then(() => {
      setShowDeleteConfirmation(false);
      setMedicineToDelete(null);
      loadMedicines();
    });
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setMedicineToDelete(null);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const addTenQuantity = (id) => {
    MedicineService.addQuantity(id, 10).then(() => {
      loadMedicines();
    });
  };

  const subtractTenQuantity = (id) => {
    MedicineService.subtractQuantity(id, 10)
      .then(() => {
        loadMedicines();
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        if (error.response && error.response.status === 400) {
          toast.error(resMessage);
        } else {
          console.error("Une erreur s'est produite:", error);
        }
      });
  };

  return (
    <div className="main-content">
      <ToastContainer
        draggable
        closeOnClick
        position="bottom-right"
        autoClose={5000}
      />{" "}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Liste des médicaments</h2>
          <button
            onClick={toggleAddForm}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <FontAwesomeIcon
              icon={showAddForm ? faTimesCircle : faPlusCircle}
              className="mr-1"
            />
            {showAddForm ? "Hide Form" : "Add Medicine"}
          </button>
        </div>
        <div
          className={`transition-all duration-1000 ease-in-out transform ${
            showAddForm
              ? "opacity-100 max-h-screen"
              : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          {showAddForm && <AddMedicineForm onMedicineAdded={loadMedicines} />}
        </div>{" "}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b text-center">
                  Liste des médicaments
                </th>
                <th className="py-2 px-4 border-b text-center">Quantité</th>
                <th className="py-2 px-4 border-b text-center">Alertes</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center">
                    {medicine.name}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {medicine.quantity === 1
                      ? `${medicine.quantity} pièce`
                      : `${medicine.quantity} pièces`}
                  </td>

                  <td
                    className={`py-2 px-4 border-b text-center ${
                      medicine.quantity < 10 ? "text-red-500" : "text-black"
                    }`}
                  >
                    {medicine.quantity < 10
                      ? "Stock insuffisant"
                      : "Quantité suffisante"}
                  </td>
                  <td className="py-2 px-4 border-b text-center flex justify-center space-x-2">
                    <button
                      onClick={() => addQuantity(medicine.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded inline-flex items-center"
                    >
                      <FontAwesomeIcon icon={faPlus} className="mr-1" />1
                    </button>
                    <button
                      onClick={() => addTenQuantity(medicine.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded inline-flex items-center"
                    >
                      <FontAwesomeIcon icon={faPlus} className="mr-1" />
                      10
                    </button>
                    <button
                      onClick={() => subtractQuantity(medicine.id)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded inline-flex items-center"
                    >
                      <FontAwesomeIcon icon={faMinus} className="mr-1" />1
                    </button>
                    <button
                      onClick={() => subtractTenQuantity(medicine.id)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded inline-flex items-center"
                    >
                      <FontAwesomeIcon icon={faMinus} className="mr-1" />
                      10
                    </button>
                    <button
                      onClick={() => handleDeleteClick(medicine)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded inline-flex items-center"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DeleteConfirmation
          show={showDeleteConfirmation}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      </div>
    </div>
  );
};

export default Pharmacie;
