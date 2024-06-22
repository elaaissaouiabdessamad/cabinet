import React from "react";

const ModalUnAffectation = ({
  isOpen,
  onRequestClose,
  handleDelete,
  message,
}) => {
  return (
    <>
      {isOpen && (
        <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
            <div>
              <div className="text-center p-5 flex-auto justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 flex items-center text-yellow-500 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <h2 className="text-xl font-bold py-4">
                  Confirmation de retrait de l'assignation
                </h2>
                <p className="text-sm text-gray-500 px-8">
                  Voulez-vous vraiment {message} ? Cette action ne peut pas être
                  annulée.
                </p>
              </div>
              <div className="p-3 mt-2 text-center space-x-4 md:block">
                <button
                  onClick={onRequestClose}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDelete}
                  className="mb-2 md:mb-0 bg-yellow-500 border border-yellow-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                >
                  Retirer l'assignation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalUnAffectation;
