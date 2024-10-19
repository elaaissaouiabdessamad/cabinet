import React from "react";

const ModalEditDoctor = ({
  isOpen,
  onRequestClose,
  doctor,
  handleChange,
  handleSubmit,
}) => {
  return (
    <>
      {isOpen && (
        <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
            <div>
              <div className="text-center p-5 flex-auto justify-center">
                <h2 className="text-xl font-bold py-4">Modifier un médecin</h2>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col space-y-4"
                >
                  <input
                    required
                    type="text"
                    name="prenom"
                    value={doctor.prenom}
                    onChange={handleChange}
                    placeholder="Prénom"
                    className="border p-2 rounded-md"
                  />
                  <input
                    required
                    type="text"
                    name="nom"
                    value={doctor.nom}
                    onChange={handleChange}
                    placeholder="Nom"
                    className="border p-2 rounded-md"
                  />
                  <input
                    required
                    type="text"
                    name="specialty"
                    value={doctor.specialty}
                    onChange={handleChange}
                    placeholder="Spécialité"
                    className="border p-2 rounded-md"
                  />
                  <input
                    required
                    type="text"
                    name="phoneNumber"
                    value={doctor.phoneNumber}
                    onChange={handleChange}
                    placeholder="Numéro de téléphone"
                    className="border p-2 rounded-md"
                  />
                  <div className="p-3 mt-2 text-center space-x-4 md:block">
                    <button
                      type="submit"
                      className="mb-2 md:mb-0 bg-blue-500 border border-blue-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-600"
                    >
                      Enregistrer
                    </button>
                    <button
                      type="button"
                      onClick={onRequestClose}
                      className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalEditDoctor;
