import React from "react";
import { Link } from "react-router-dom";

const Sectors = () => {
  return (
    <div className="p-10">
      <div className="flex items-center mb-4">
        <div className="flex items-center w-full">
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow p-2 border rounded-lg"
          />
          <button className="ml-2 p-2 bg-white border rounded-lg">
            <i class="fas fa-search"></i>
          </button>
        </div>
        <button className="ml-4 p-2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      <div className="mt-20 flex justify-around text-center w-full">
        <Link to="/patients/1" className="no-underline">
          <div className="rounded-3xl bg-gradient-to-b hover:bg-gradient-to-t from-[#000e29] to-[#1c437c] text-white p-16 shadow-lg cursor-pointer transform transition duration-500 hover:scale-105">
            <div className="mb-20 text-center text-xl font-bold">
              SECTEUR USI
            </div>
            <div className="text-center">
              6 LITS OCCUPÉS
              <br />6 LITS LIBRES
            </div>
          </div>
        </Link>
        <Link to="/patients/2" className="no-underline">
          <div className="rounded-3xl text-center bg-gradient-to-b hover:bg-gradient-to-t from-[#3a73aa] to-[#6490bd] text-white p-16 shadow-lg transform transition duration-500 hover:scale-105">
            <div className="mb-20 text-center text-xl font-bold">
              SECTEUR FROID
            </div>
            <div className="text-center">
              8 LITS OCCUPÉS
              <br />4 LITS LIBRES
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sectors;
