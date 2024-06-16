import React, { useState } from "react";
import MedicineService from "../../services/medicine.service";

const MAX_QUANTITY = 1000;

const AddMedicineForm = ({ onMedicineAdded }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [alert, setAlert] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity > MAX_QUANTITY) {
      alert(`Quantity cannot exceed ${MAX_QUANTITY} units.`);
      return;
    }
    const newMedicine = { name, quantity: parseInt(quantity), alert };
    MedicineService.createMedicine(newMedicine).then(() => {
      onMedicineAdded();
      setName("");
      setQuantity(0);
      setAlert("");
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 bg-white p-4 rounded-lg shadow-md"
    >
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-1">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-1">Quantity:</label>
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
        Add Medicine
      </button>
    </form>
  );
};

export default AddMedicineForm;
