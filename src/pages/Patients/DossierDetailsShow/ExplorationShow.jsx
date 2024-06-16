import React from "react";
import { Link } from "react-router-dom";
import icon10 from "../../../assets/icon10.png";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import HeaderDossierShow from "../../../components/HeaderDossierShow";
const Exploration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const handlePrevious = () => {
    navigate("/show/diagnostic", { state: { patient, color } });
  };

  const handleNext = () => {
    navigate("/show/biologie", { state: { patient, color } });
  };

  const handleDossierShow = () => {
    navigate(`/dossier/show/${patient.medicalDossier.id}`, {
      state: { patient, color },
    });
  };

  return (
    <div className="flex flex-col items-center p-10">
      <HeaderDossierShow handleDossierShow={handleDossierShow} />
      <div className={`mb-6 text-${color} font-bold`}>
        Mr Patient{" "}
        <span className="text-gray-500">
          {patient?.prenom} {patient?.nom}
        </span>
        , ref:<span className="text-gray-500"> {patient?.referenceID}</span>
      </div>
      <div className="bg-white border border-black rounded-3xl shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-black justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img
              src={icon10}
              alt="Identité"
              className="mr-2 align-center w-8"
            />
            Exploration
          </div>
        </div>
        <div className="p-6">
          <Link
            to="/show/exploration/radio-throax"
            state={{ patient, color }}
            className="no-underline"
          >
            <button className="bg-gradient-to-b from-[#97bfe4] to-[#3472ab] mt-5 mb-15 border border-black hover:shadow-lg hover:shadow-xl hover:shadow-2xl hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-4 w-full">
              Radio du thorax
            </button>
          </Link>
          <Link
            to="/show/exploration/echocardiographie"
            state={{ patient, color }}
            className="no-underline"
          >
            <button className="bg-gradient-to-b from-[#97bfe4] to-[#3472ab] mb-15 mt-10 border border-black hover:shadow-lg hover:shadow-xl hover:shadow-2xl hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-4 w-full">
              Echocardiographie
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-between w-full max-w-md mt-6">
        <button
          onClick={handlePrevious}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-lg"
        >
          Précédent
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Exploration;
