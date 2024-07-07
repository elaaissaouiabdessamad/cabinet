import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import zxcvbn from "zxcvbn";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    if (passwordScore < 2) {
      toast.error("Le nouveau mot de passe est trop faible.");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("http://localhost:3000/api/auth/reset-password", {
        token,
        newPassword,
      });
      toast.success("Réinitialisation du mot de passe réussie.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      setIsButtonDisabled(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(
          "Le lien de réinitialisation du mot de passe est expiré ou n'existe pas. Veuillez renvoyer votre demande en cliquant sur le lien 'Mot de passe oublié'."
        );
      } else {
        toast.error(
          "Erreur lors de la réinitialisation du mot de passe. Veuillez renvoyer votre demande de réinitialisation en cliquant sur le lien 'Mot de passe oublié'."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setNewPassword(value);
    const result = zxcvbn(value);
    setPasswordScore(result.score);
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

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        draggable
        closeOnClick
        autoClose={5000}
      />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Entrez le nouveau mot de passe
        </h2>
        <form className="space-y-6" onSubmit={handleResetPassword}>
          <div className="relative">
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={handlePasswordChange}
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          {newPassword !== "" && (
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
            <input
              type="password"
              placeholder="Confirmez le nouveau mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            disabled={isLoading || isButtonDisabled}
          >
            {isLoading ? "En cours..." : "Réinitialiser le mot de passe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
