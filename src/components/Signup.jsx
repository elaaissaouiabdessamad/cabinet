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
import zxcvbn from "zxcvbn";
import Logo from "../logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [passwordScore, setPasswordScore] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "password") {
      const result = zxcvbn(value);
      setPasswordScore(result.score);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const getPasswordStrengthColor = (score) => {
    switch (score) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-orange-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-blue-500";
      case 4:
        return "bg-green-500";
      default:
        return "";
    }
  };

  const getPasswordStrengthTextColor = (score) => {
    switch (score) {
      case 0:
        return "text-red-500";
      case 1:
        return "text-orange-500";
      case 2:
        return "text-yellow-500";
      case 3:
        return "text-blue-500";
      case 4:
        return "text-green-500";
      default:
        return "";
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (passwordScore < 2) {
      toast.error("Le mot de passe est trop faible.");
      return;
    }
    if (formData.password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      await axios.post("http://localhost:3000/api/auth/signup", formData);
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la création du compte."
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer
        draggable
        closeOnClick
        position="top-right"
        autoClose={5000}
      />
      <img src={Logo} alt="Logo" className="mr-64 w-64 mb-6" />
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <form className="space-y-4" onSubmit={handleSignup}>
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
          {formData.password !== "" && (
            <div className="flex items-center mt-2">
              <div className="w-full bg-gray-200 rounded">
                <div
                  className={`h-2 rounded ${getPasswordStrengthColor(
                    passwordScore
                  )} transition-all duration-300 ease-in-out`}
                  style={{ width: `${(passwordScore + 1) * 20}%` }}
                ></div>
              </div>
              <span
                className={`ml-4 transition-colors duration-300 ease-in-out ${getPasswordStrengthTextColor(
                  passwordScore
                )}`}
              >
                {passwordScore === 0
                  ? "Fragile"
                  : passwordScore === 1
                  ? "Faible"
                  : passwordScore === 2
                  ? "Moyen"
                  : passwordScore === 3
                  ? "Bon"
                  : "Fort"}
              </span>
            </div>
          )}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaLock />
            </span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="relative w-1/2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <FaUserMd />
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
            <div className="relative w-1/2">
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
              <FaPhone className="rotate-90" />
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
