import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderStandard from "../../components/HeaderStandard";

const Agenda = () => {
  const navigate = useNavigate();

  return (
    <div className="flex m-8 flex-col items-center">
      <div className="flex flex-col space-y-4 mt-8">
        <button
          onClick={() => navigate("/salle-catheterisme")}
          className="bg-green-300 text-center py-8 px-48 rounded-md border border-gray-300 w-full text-xl"
        >
          Salle de cathétérisme
        </button>
        <button
          onClick={() => navigate("/bloc-rythmologie")}
          className="bg-green-300 text-center py-8 px-48 rounded-md border border-gray-300 w-full text-xl"
        >
          Bloc de rythmologie
        </button>
        <button
          onClick={() => navigate("/garde-des-medecins")}
          className="bg-green-300 text-center py-8 px-48 rounded-md border border-gray-300 w-full text-xl"
        >
          Garde des médecins
        </button>
        <button
          onClick={() => navigate("/garde-des-infirmieres")}
          className="bg-green-300 text-center py-8 px-48 rounded-md border border-gray-300 w-full text-xl"
        >
          Infirmières responsables
        </button>
      </div>
    </div>
  );
};

export default Agenda;
