import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa"; // Import icon from react-icons library
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoctorService from "../../services/doctor.service"; // Adjust the import path as needed

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [newPassword, setNewPassword] = useState("");
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
    if (userData) {
      fetchDoctorInfo(userData.userId);
    }
  }, [userData]);

  const fetchDoctorInfo = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/auth/${userId}/doctor`
      );
      setDoctorInfo(response.data);
    } catch (error) {
      console.error("Error fetching doctor information:", error);
      toast.error("Error fetching doctor information.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/reset-password-auth",
        {
          username: userData.username,
          newPassword,
        }
      );
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password");
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
      toast.success("Doctor information updated successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error updating doctor information"
      );
    }
  };

  if (!userData) {
    return <div>No user data found.</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <ToastContainer
        draggable
        closeOnClick
        position="top-right"
        autoClose={5000}
      />
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="mb-4">
        <strong>Username:</strong> {userData.username}
      </div>
      <div className="mb-4">
        <strong>Email:</strong> {userData.email}
      </div>
      <div className="mb-4">
        <strong>Roles:</strong> {userData.roles.join(", ")}
      </div>

      {doctorInfo && (
        <div className="mb-4 border-t mt-6 pt-4">
          <h3 className="text-xl font-bold mb-2">Doctor Information</h3>
          {!editMode ? (
            <>
              <div className="mb-2">
                <strong>Nom:</strong> {doctorInfo.nom}
              </div>
              <div className="mb-2">
                <strong>Prenom:</strong> {doctorInfo.prenom}
              </div>
              <div className="mb-2">
                <strong>Specialty:</strong> {doctorInfo.specialty}
              </div>
              <div className="mb-2">
                <strong>Phone Number:</strong> {doctorInfo.phoneNumber}
              </div>
              <button
                onClick={handleEditDoctor}
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Edit Doctor Info
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
                Update Doctor Info
              </button>
            </form>
          )}
        </div>
      )}

      <div className="border-t mt-6 pt-4">
        <h3 className="text-xl font-bold mb-2">Reset Password</h3>
        <form className="space-y-6" onSubmit={handleResetPassword}>
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
