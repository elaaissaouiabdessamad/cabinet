import axiosInstance from "./axiosInstance";

const API_URL = "doctors/";
const API_URLn = "doctors";

const getAllDoctors = () => {
  return axiosInstance.get(API_URLn);
};

const getDoctorById = (doctorId) => {
  return axiosInstance.get(API_URL + doctorId);
};

const createDoctor = (doctorData) => {
  return axiosInstance.post(API_URLn, doctorData);
};

const updateDoctor = (doctorId, doctorData) => {
  return axiosInstance.put(API_URL + doctorId, doctorData);
};

const deleteDoctor = (doctorId) => {
  return axiosInstance.delete(API_URL + doctorId);
};

const API_URLDS = "doctor-shifts/";

const getDoctorGuards = (startDate, endDate, shiftType) => {
  return axiosInstance.get(`${API_URLDS}guards`, {
    params: { startDate, endDate, shiftType },
  });
};

const generateShifts = (startDate, endDate) => {
  return axiosInstance.post(`${API_URLDS}generate`, null, {
    params: { startDate, endDate },
  });
};

const deleteShifts = (startDate, endDate) => {
  return axiosInstance.delete(`${API_URLDS}delete`, {
    params: { startDate, endDate },
  });
};

const addShift = (date, shiftType, doctorId) => {
  return axiosInstance.post(
    `${API_URLDS}date/${date}/shift-type/${shiftType}/doctor/${doctorId}`
  );
};

const updateShift = (shiftId, doctorId) => {
  return axiosInstance.put(`${API_URLDS}${shiftId}/doctor/${doctorId}`);
};

const deleteShift = (shiftId) => {
  return axiosInstance.delete(`${API_URLDS}${shiftId}`);
};

const DoctorService = {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorGuards,
  generateShifts,
  deleteShifts,
  addShift,
  updateShift,
  deleteShift,
};

export default DoctorService;
