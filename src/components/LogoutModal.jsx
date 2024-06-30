import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
const LogoutModal = ({ show, onClose, onConfirm }) => {
  return (
    <>
      {show && (
        <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
            <div>
              <div className="text-center p-5 flex-auto justify-center">
                <FaSignOutAlt className="w-12 h-12 flex items-center text-red-500 mx-auto mb-2" />
                <h2 className="text-xl mt-6">Confirmer la déconnexion</h2>
                <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
              </div>
              <div className="p-3 text-center space-x-4 md:block">
                <button
                  onClick={onConfirm}
                  className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                >
                  Déconnexion
                </button>
                <button
                  onClick={onClose}
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

export default LogoutModal;
