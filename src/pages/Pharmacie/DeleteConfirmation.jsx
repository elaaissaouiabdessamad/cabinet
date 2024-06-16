import React from "react";

const DeleteConfirmation = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="mb-4 text-lg font-semibold">
          Are you sure you want to delete this medicine?
        </h2>
        <div>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
