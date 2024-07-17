import React from "react";

const ModalActivateDoctor = ({
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
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-16 h-16 flex items-center text-green-500 mx-auto"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>

                <h2 className="text-xl font-bold py-4">
                  Confirmation d'activation
                </h2>
                <p className="text-sm text-gray-500 px-8">
                  Voulez-vous vraiment {message} ?
                </p>
              </div>
              <div className="p-3 mt-2 text-center space-x-4 md:block">
                <button
                  onClick={handleDelete}
                  className="mb-2 md:mb-0 bg-green-500 border border-green-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600"
                >
                  Activer
                </button>
                <button
                  onClick={onRequestClose}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalActivateDoctor;
