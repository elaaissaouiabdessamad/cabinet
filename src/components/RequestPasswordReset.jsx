import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css";

const RequestPasswordReset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsButtonDisabled(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/request-password-reset",
        { email }
      );
      const { message } = response.data;
      toast.success(message);
      setTimeout(() => {
        setIsButtonDisabled(false);
        navigate("/login");
      }, 3000);
    } catch (error) {
      const { message } = error.response.data;
      setIsButtonDisabled(false);
      toast.error(message);
    } finally {
      setIsLoading(false);
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
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Réinitialiser le mot de passe
        </h2>
        <form className="space-y-6" onSubmit={handleRequestReset}>
          <input
            type="email"
            placeholder="Entrez votre adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 flex justify-center items-center"
            disabled={isLoading || isButtonDisabled} // Désactive le bouton pendant le chargement ou pendant la temporisation
          >
            {isLoading ? (
              <ClipLoader size={24} color="#ffffff" />
            ) : (
              "Envoyer le lien de réinitialisation"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestPasswordReset;
