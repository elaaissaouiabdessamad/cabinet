import React from "react";
const HeaderStandard = () => {
  return (
    <div className="flex items-center mb-6 w-full">
      <input
        type="text"
        placeholder="Rechercher..."
        className="flex-grow p-2 border border-gray-400 rounded-lg"
      />
      <button className="absolute right-0 top-0 p-2 rounded-lg">
        <i className="fas fa-search"></i>
      </button>
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
  );
};

export default HeaderStandard;
