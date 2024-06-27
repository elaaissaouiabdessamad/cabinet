import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUnlock } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoctorService from "../../services/doctor.service";

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
  }, []);

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

  const handleUpdateDoctor = async (e) => {
    e.preventDefault();
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

  return (
    <div className="max-w-lg mx-auto mb-6">
      <ToastContainer
        draggable
        closeOnClick
        position="bottom-right"
        autoClose={5000}
      />
      <div className="mb-4 border-t mt-6 pt-4 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="mb-4">
          <strong>Username:</strong> {userData.username}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {userData.email}
        </div>
      </div>

      {doctorInfo && (
        <div className="mb-4 border-t mt-6 pt-4 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Détails du médecin</h3>
          {!editMode ? (
            <>
              <div className="mb-2">
                <strong>Nom:</strong> {doctorInfo.nom}
              </div>
              <div className="mb-2">
                <strong>Prénom:</strong> {doctorInfo.prenom}
              </div>
              <div className="mb-2">
                <strong>Specialtité:</strong> {doctorInfo.specialty}
              </div>
              <div className="mb-2">
                <strong>Téléphone:</strong> {doctorInfo.phoneNumber}
              </div>
              <button
                onClick={handleEditDoctor}
                className="py-2 mt-4 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Modifier les données du médecin
              </button>
            </>
          ) : (
            <form className="space-y-6" onSubmit={handleUpdateDoctor}>
              <div className="relative">
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
              <div className="relative">
                <input
                  type="text"
                  name="prenom"
                  value={editDoctorInfo.prenom}
                  onChange={handleDoctorChange}
                  placeholder="Prenom"
                  className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="specialty"
                  value={editDoctorInfo.specialty}
                  onChange={handleDoctorChange}
                  placeholder="Specialty"
                  className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="phoneNumber"
                  value={editDoctorInfo.phoneNumber}
                  onChange={handleDoctorChange}
                  placeholder="Phone Number"
                  className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Mise à jour des données du médecin
              </button>
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
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              placeholder="Confirmez le nouveau mot de passe"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Réinitialiser le mot de passe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
