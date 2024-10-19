import React, { useState } from "react";
import MedicineService from "../../services/medicine.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MAX_QUANTITY = 1000;

const AddMedicineForm = ({ onMedicineAdded }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [alert, setAlert] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity > MAX_QUANTITY) {
      toast.error(`La quantité ne peut pas dépasser ${MAX_QUANTITY} unités.`);
      return;
    }
    const newMedicine = { name, quantity: parseInt(quantity), alert };
    MedicineService.createMedicine(newMedicine)
      .then(() => {
        onMedicineAdded();
        setName("");
        setQuantity(0);
        setAlert("");
        toast.success("Médicament ajouté avec succès !");
      })
      .catch(() => {
        toast.error("Erreur lors de l'ajout du médicament.");
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mb-4 bg-white p-4 rounded-lg shadow-md"
      >
        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-1">Nom:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-1">
            Quantité:
          </label>
          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max={MAX_QUANTITY}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="w-full mr-4"
            />
            <span className="text-gray-700 font-bold">{quantity}</span>
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Ajouter un médicament
        </button>
      </form>
    </div>
  );
};

export default AddMedicineForm;
