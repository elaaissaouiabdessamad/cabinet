import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaUserMd,
  FaPhone,
  FaBriefcase,
  FaUserAlt,
} from "react-icons/fa";
import axios from "axios";
import Logo from "../logo.png"; // Adjust the path as needed

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    doctorNom: "",
    doctorPrenom: "",
    specialty: "",
    phoneNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/signup", formData);
      navigate("/login"); // Navigate to login after successful signup
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error creating account"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <img src={Logo} alt="Logo" className="mr-64 w-64 mb-6" />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <form className="space-y-6" onSubmit={handleSignup}>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaUser />
            </span>
            <input
              type="text"
              name="username"
              placeholder="Identifiant"
              value={formData.username}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaEnvelope />
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaUserMd />
            </span>
            <input
              type="text"
              name="doctorNom"
              placeholder="Nom du Docteur"
              value={formData.doctorNom}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaUserAlt />
            </span>
            <input
              type="text"
              name="doctorPrenom"
              placeholder="Prenom du Docteur"
              value={formData.doctorPrenom}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaBriefcase />
            </span>
            <input
              type="text"
              name="specialty"
              placeholder="Spécialité"
              value={formData.specialty}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaPhone />
            </span>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Numéro de Téléphone"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Créer un compte
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Déjà un compte ? </span>
          <Link to="/login" className="text-blue-500 hover:underline">
            Connexion
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
