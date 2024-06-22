import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");

  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/auth/request-password-reset",
        { email }
      );
      toast.success("Password reset email sent.");
    } catch (error) {
      toast.error("Error sending password reset email.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form className="space-y-6" onSubmit={handleRequestReset}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestPasswordReset;
