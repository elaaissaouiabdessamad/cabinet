import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa"; // Import icons from react-icons library
import Logo from "../logo.png"; // Adjust the path as needed

function Login({ login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your authentication logic here.
    if (username === "admin" && password === "admin") {
      login();
      navigate("/dashboard"); // Navigate to dashboard
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <img src={Logo} alt="Logo" className="mr-32 h-72 mb-6" />
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
          <button
            type="button"
            className="w-full py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition duration-300"
          >
            Mot de passe oublié
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
