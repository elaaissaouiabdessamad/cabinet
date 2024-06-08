import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BedService from "../../services/bed.service";
import moment from "moment";

const Patients = () => {
  const { sectorId } = useParams();
  const [beds, setBeds] = useState([]);

  useEffect(() => {
    const fetchBeds = async () => {
      try {
        const response = await BedService.getBedsBySectorId(sectorId);
        setBeds(response.data);
      } catch (error) {
        console.error("Error fetching beds:", error);
      }
    };

    if (sectorId) {
      fetchBeds();
    }
  }, [sectorId]);

  const handleAddBed = async () => {
    try {
      await BedService.addBedBySectorId(sectorId);
      // Refresh beds after adding a new bed
      const response = await BedService.getBedsBySectorId(sectorId);
      setBeds(response.data);
    } catch (error) {
      console.error("Error adding bed:", error);
    }
  };

  const handleRemovePatient = async (bedId) => {
    try {
      await BedService.removePatientToBed(bedId);
      // Refresh beds after removing the patient
      const response = await BedService.getBedsBySectorId(sectorId);
      setBeds(response.data);
    } catch (error) {
      console.error("Error removing patient from bed:", error);
    }
  };

  const getColorClass = (bed) => {
    if (bed.state === "EMPTY") {
      return "border-blue-500 text-blue-500";
    }
    const daysOccupied = moment().diff(moment(bed.startDateTime), "days");
    if (daysOccupied < 10) {
      return "border-green-500 text-green-500";
    }
    return "border-red-500 text-red-500";
  };

  return (
    <div className="p-4">
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
        <button
          onClick={handleAddBed}
          className="ml-4 p-2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center"
        >
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
      <div className="grid grid-cols-3 gap-6">
        {beds.map((bed) => (
          <div key={bed.id} className="relative">
            <Link to={`/beds/${bed.id}`} className="no-underline">
              <div
                className={`p-4 border-2 rounded-lg shadow-md ${
                  getColorClass(bed).split(" ")[0]
                }`}
              >
                <h3
                  className={`text-lg font-semibold ${
                    getColorClass(bed).split(" ")[1]
                  }`}
                >
                  Lit {bed.id}
                </h3>
                {bed.state === "OCCUPIED" ? (
                  <>
                    <p className={`${getColorClass(bed).split(" ")[1]} mt-2`}>
                      {bed.currentPatient ? bed.currentPatient.nom : "Inconnu"}
                    </p>
                    <p className={`${getColorClass(bed).split(" ")[1]}`}>
                      {`Diagnostic: ${moment(bed.startDateTime).format(
                        "YYYY-MM-DD"
                      )}`}
                    </p>
                  </>
                ) : (
                  <p className="text-blue-500 mt-2 mb-6">LIBRE</p>
                )}
              </div>
            </Link>
            {bed.state === "OCCUPIED" && (
              <button
                onClick={() => handleRemovePatient(bed.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-200"
              >
                &times;
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patients;
