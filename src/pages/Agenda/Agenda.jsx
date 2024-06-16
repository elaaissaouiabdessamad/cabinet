import React from "react";

const Agenda = () => {
  return (
    <div className="flex m-4 flex-col items-center w-full">
      <div className="flex items-center w-full mt-4 px-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-400 rounded-lg"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-600">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <button className="p-2 ml-4 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      <div className="bg-blue-700 text-white p-8 m-8 rounded-lg shadow-lg w-full max-w-4xl text-center">
        <h1 className="text-xl font-bold mb-6">Patients agendati</h1>
        <ul className="space-y-4">
          <li>Patients adhérents à la CNOPS</li>
          <li>Patients adhérents à la CNSS</li>
          <li>Patients adhérents à la MAFAR ou autres mutuelles</li>
          <li>Patients payants</li>
        </ul>
      </div>
    </div>
  );
};

export default Agenda;
