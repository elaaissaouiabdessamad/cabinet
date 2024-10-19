import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUnlock } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import zxcvbn from "zxcvbn";
import DoctorService from "../../services/doctor.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faUser,
  faUserMd,
  faPhone,
  faEnvelope,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editDoctorInfo, setEditDoctorInfo] = useState({
    nom: "",
    prenom: "",
    specialty: "",
    phoneNumber: "",
  });
  const [passwordScore, setPasswordScore] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorInfo = async (userId) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/auth/${userId}/doctor`
        );
        setDoctorInfo(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la réception des données du médecin:",
          error
        );
        toast.error("Erreur lors de la réception des données du médecin.");
      }
    };
    fetchDoctorInfo(userData.userId);
  }, [userData.userId]);

  const logout = () => {
    localStorage.removeItem("activeLink");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    if (passwordScore < 2) {
      toast.error("Le nouveau mot de passe est trop faible.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/reset-password-auth",
        {
          username: userData.username,
          oldPassword,
          newPassword,
        }
      );
      toast.success(response.data.message);
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la mise à jour de mot de passe."
      );
    }
  };

  const handleEditDoctor = () => {
    setEditDoctorInfo({
      id: doctorInfo.id,
      nom: doctorInfo.nom,
      prenom: doctorInfo.prenom,
      specialty: doctorInfo.specialty,
      phoneNumber: doctorInfo.phoneNumber,
    });
    setEditMode(true);
  };

  const handleDoctorChange = (e) => {
    const { name, value } = e.target;
    setEditDoctorInfo({ ...editDoctorInfo, [name]: value });
  };

  const handleEditModeChange = () => {
    setEditMode(!editMode);
  };

  const handleUpdateDoctor = async (e) => {
    e.preventDefault();
    console.log("Updating doctor with info:", editDoctorInfo);
    try {
      await DoctorService.updateDoctor(doctorInfo.id, editDoctorInfo);
      setDoctorInfo(editDoctorInfo);
      setEditMode(false);
      toast.success("Les données du médecin mis à jour avec succès.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la modification des données du médecin."
      );
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
    <div className="w-2/3 mx-auto mb-6">
      <ToastContainer
        draggable
        closeOnClick
        position="bottom-right"
        autoClose={5000}
      />
      <div className="mb-4 border-t mt-6 pt-4 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">Profile</h2>
        <div className="flex items-center mb-4">
          <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
          <div>
            <strong>Username:</strong> {userData.username}
          </div>
        </div>
        <div className="flex items-center mb-4">
          <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-2" />
          <div>
            <strong>Email:</strong> {userData.email}
          </div>
        </div>
      </div>

      {doctorInfo && (
        <div className="mb-4 border-t mt-6 pt-4 p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center mb-3">
            <h3 className="text-xl font-bold mr-5">Détails du médecin</h3>
            {!editMode ? (
              <button
                onClick={handleEditDoctor}
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
              >
                <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
                Modifier les données du médecin
              </button>
            ) : (
              ""
            )}
          </div>
          {!editMode ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faUser} className="text-gray-600" />
                <div>
                  <strong>Prénom:</strong> {doctorInfo.prenom}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faUser} className="text-gray-600" />
                <div>
                  <strong>Nom:</strong> {doctorInfo.nom}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faUserMd} className="text-gray-600" />
                <div>
                  <strong>Spécialité:</strong> {doctorInfo.specialty}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faPhone} className="text-gray-600" />
                <div>
                  <strong>Téléphone:</strong> {doctorInfo.phoneNumber}
                </div>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleUpdateDoctor}>
              <div className="flex space-x-4">
                <div className="relative w-1/2">
                  <label className="block text-gray-700">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={editDoctorInfo.prenom}
                    onChange={handleDoctorChange}
                    placeholder="Prénom"
                    className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
                <div className="relative w-1/2">
                  <label className="block text-gray-700">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Nom
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={editDoctorInfo.nom}
                    onChange={handleDoctorChange}
                    placeholder="Nom"
                    className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="relative w-1/2">
                  <label className="block text-gray-700">
                    <FontAwesomeIcon icon={faUserMd} className="mr-2" />
                    Spécialité
                  </label>
                  <input
                    type="text"
                    name="specialty"
                    value={editDoctorInfo.specialty}
                    onChange={handleDoctorChange}
                    placeholder="Spécialité"
                    className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
                <div className="relative w-1/2">
                  <label className="block text-gray-700">
                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                    Téléphone
                  </label>
                  <input
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    type="text"
                    name="phoneNumber"
                    value={editDoctorInfo.phoneNumber}
                    onChange={handleDoctorChange}
                    placeholder="Téléphone"
                    className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-4 justify-evenly">
                <button
                  type="submit"
                  className="w-1/4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
                  Mettre à jour
                </button>
                <button
                  onClick={handleEditModeChange}
                  className="w-1/4 bg-white hover:bg-blue-200 border-blue-200 hover:border-blue-200 border text-blue-500 font-bold py-2 px-4 rounded-lg flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faTimes} className="mr-2" />
                  Annuler
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      <div className="border-t mt-6 pt-4 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-2">
          Réinitialiser le mot de passe
        </h3>
        <form className="space-y-6" onSubmit={handleResetPassword}>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaLock />
            </span>
            <input
              type="password"
              name="oldPassword"
              placeholder="Ancien mot de passe"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaUnlock />
            </span>
            <input
              type="password"
              name="newPassword"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={handlePasswordChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaUnlock />
            </span>
            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirmer le nouveau mot de passe"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Réinitialiser le mot de passe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
