import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BedService from "../../services/bed.service"; // Ensure the path is correct

const Sectors = () => {
  const [sectors, setSectors] = useState([
    {
      id: 1,
      name: "SECTEUR USI",
      occupied: 0,
      empty: 0,
      bgFrom: "#000e29",
      bgTo: "#1c437c",
    },
    {
      id: 2,
      name: "SECTEUR FROID",
      occupied: 0,
      empty: 0,
      bgFrom: "#3a73aa",
      bgTo: "#6490bd",
    },
  ]);

  useEffect(() => {
    const fetchSectorData = async () => {
      try {
        const updatedSectors = await Promise.all(
          sectors.map(async (sector) => {
            const response = await BedService.getBedsBySectorId(sector.id);
            const beds = response.data;
            const occupied = beds.filter(
              (bed) => bed.state === "OCCUPIED"
            ).length;
            const empty = beds.filter((bed) => bed.state === "EMPTY").length;
            return { ...sector, occupied, empty };
          })
        );
        setSectors(updatedSectors);
      } catch (error) {
        console.error("Error fetching sector data:", error);
      }
    };

    fetchSectorData();
  }, []); // Add 'sectors' to the dependency array

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
            <i className="fas fa-search"></i>
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
        {sectors.map((sector) => (
          <Link
            to={`/patients/${sector.id}`}
            key={sector.id}
            className="no-underline"
          >
            <div
              className="rounded-3xl transition-transform duration-500 hover:scale-105"
              style={{
                backgroundImage: `linear-gradient(to bottom, ${sector.bgFrom}, ${sector.bgTo})`,
                color: "white",
                padding: "57px", // Adjust padding as needed
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                transition: "box-shadow 0.5s", // Add box-shadow transition
              }}
            >
              <div className="mb-20 text-center text-xl font-bold">
                {sector.name}
              </div>
              <div className="text-center">
                {sector.occupied} LITS OCCUPÉS
                <br />
                {sector.empty} LITS LIBRES
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sectors;
