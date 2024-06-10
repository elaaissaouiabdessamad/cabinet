import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa"; // Import icons from react-icons library
import axios from "axios";
import Logo from "../logo.png"; // Adjust the path as needed

function PasswordReset() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/reset-password",
        {
          username,
          newPassword,
        }
      );
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      // Optionally, navigate to login or another page after successful password reset
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error resetting password"
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/*<img src={Logo} alt="Logo" className="mr-32 h-72 mb-6" />*/}
      <img src={Logo} alt="Logo" className="mr-64 w-64 mb-6" />

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <form className="space-y-6" onSubmit={handleResetPassword}>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaUser />
            </span>
            <input
              type="text"
              placeholder="Identifiant"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaLock />
            </span>
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          {successMessage && (
            <div className="text-green-500">{successMessage}</div>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Réinitialiser le mot de passe
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 hover:underline">
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
