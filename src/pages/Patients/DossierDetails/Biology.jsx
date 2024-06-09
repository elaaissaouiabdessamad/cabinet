import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MedicalService from "../../../services/medical.service";
import icon11 from "../../../assets/icon11.png";
import iconFolder from "../../../assets/iconFolder.png";

const Biology = () => {
  const location = useLocation();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const [bilanFile, setBilanFile] = useState(null);
  const [conclusion, setConclusion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("bilanFile", bilanFile);
      formData.append("conclusion", conclusion);
      const response = await MedicalService.addBiology(formData, patient.id);
      setLoading(false);
      setMessage(response.data.message);
      setSuccessful(true);
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setLoading(false);
      setMessage(resMessage);
      setSuccessful(false);
    }
  };

  const handleFileChange = (e) => {
    setBilanFile(e.target.files[0]);
  };

  const handleConclusionChange = (e) => {
    setConclusion(e.target.value);
  };

  return (
    <div className="flex flex-col items-center p-10">
      <div className="flex items-center w-full">
        <div className="flex items-center mb-3 w-full">
          <div className="flex items-center w-full relative">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow p-2 border border-gray-400 rounded-lg pr-10"
            />
            <button className="absolute right-0 top-0 mr-2 p-2 rounded-lg">
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
      </div>{" "}
      <div className={`mb-6 text-${color} font-bold`}>
        Mr Patient {patient?.prenom} {patient?.nom}
      </div>
      <div className="bg-white border border-black rounded-3xl shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-black flex justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img
              src={icon11}
              alt="Identité"
              className="mr-2 align-center w-8"
            />
            Biology
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 m-4 flex justify-between items-center">
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            <img src={iconFolder} alt="Folder Icon" className="h-14 w-14" />
          </div>
          <div className="p-6 m-4 text-center">
            <textarea
              className="w-full h-32 p-2 border"
              placeholder="Conclusion"
              value={conclusion}
              onChange={handleConclusionChange}
            ></textarea>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {message && (
            <div className="text-sm text-center text-gray-700 dark:text-gray-200 mb-8 m-4">
              <div
                className={`${
                  successful ? "bg-green-500" : "bg-red-500"
                } text-white font-bold rounded-lg border border-white shadow-lg p-5 m-4`}
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Biology"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Biology;
