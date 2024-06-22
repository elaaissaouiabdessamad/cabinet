import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../logo.png";

function Login({ login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          username,
          password,
        }
      );
      const { accessToken, id, roles, email } = response.data;
      const userData = {
        token: accessToken,
        userId: id,
        email: email,
        username: username,
        roles,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      login();
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Informations d'identification invalides"
      );
      toast.error(
        error.response?.data?.message ||
          "Informations d'identification invalides"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        draggable
        closeOnClick
        autoClose={5000}
      />
      <img src={Logo} alt="Logo" className="mr-64 w-64 mb-6" />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <form className="space-y-6" onSubmit={handleLogin}>
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
            />
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaLock />
            </span>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Connexion
          </button>
          <Link
            to="/password-reset"
            className="w-full py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition duration-300 text-center block mt-2"
          >
            Mot de passe oublié ?
          </Link>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Pas encore de compte ? </span>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Inscrivez-vous
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
